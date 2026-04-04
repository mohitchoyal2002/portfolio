import express from 'express';
import serverless from 'serverless-http';
import cors from 'cors';
import axios from 'axios';
import NodeCache from 'node-cache';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const cache = new NodeCache({ stdTTL: 60 });

app.use(cors());
app.use(express.json());

const notionAxios = axios.create({
    baseURL: 'https://api.notion.com/v1',
    headers: {
        'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
});

const safeGetText = (prop) => {
    if (prop && prop.title && prop.title.length > 0) return prop.title[0].plain_text;
    if (prop && prop.rich_text && prop.rich_text.length > 0) return prop.rich_text[0].plain_text;
    return '';
};

const safeGetUrl = (prop, fallback = null) => {
    if (prop && prop.type === 'url' && prop.url) return prop.url;
    if (prop && prop.type === 'files' && prop.files && prop.files.length > 0) {
        const fileObj = prop.files[0];
        if (fileObj.type === 'file' && fileObj.file) return fileObj.file.url;
        if (fileObj.type === 'external' && fileObj.external) return fileObj.external.url;
    }
    if (prop && prop.url) return prop.url;
    return fallback;
};

const router = express.Router();

router.get('/profile', async (req, res) => {
  const cachedData = cache.get('notion_profile');
  if (cachedData) {
    console.log('Serving from cache');
    return res.json(cachedData);
  }

  try {
    const [projRes, expRes, eduRes, skillRes, profRes] = await Promise.all([
        notionAxios.post(`/databases/${process.env.NOTION_PROJECTS_DB_ID}/query`),
        notionAxios.post(`/databases/${process.env.NOTION_EXPERIENCE_DB_ID}/query`),
        notionAxios.post(`/databases/${process.env.NOTION_EDUCATION_DB_ID}/query`),
        notionAxios.post(`/databases/${process.env.NOTION_SKILLS_DB_ID}/query`),
        notionAxios.post(`/databases/${process.env.NOTION_PROFILE_DB_ID}/query`)
    ]);

    const projResults = projRes.data.results;
    const expResults = expRes.data.results;
    const eduResults = eduRes.data.results;
    const skillResults = skillRes.data.results;
    const profResults = profRes.data.results;

    const payload = {
        projects: projResults.map(row => ({
            name: safeGetText(row.properties.Name),
            desc: safeGetText(row.properties.Description),
            tech: safeGetText(row.properties.Tech),
            github: safeGetUrl(row.properties.Github),
            link: safeGetUrl(row.properties.Live),
            image: safeGetUrl(row.properties.Image)
        })),
        experience: expResults.map(row => ({
            employer: safeGetText(row.properties.Employer),
            position: safeGetText(row.properties.Position),
            duration: safeGetText(row.properties.Duration),
            work: safeGetText(row.properties.Work),
            tech: safeGetText(row.properties.Tech),
            logo: safeGetUrl(row.properties.Logo)
        })),
        education: eduResults.map(row => ({
            degree: safeGetText(row.properties.Degree),
            institute: safeGetText(row.properties.Institute),
            duration: safeGetText(row.properties.Duration)
        })),
        frontend: [],
        backend: [],
        other: [],
        intro: null,
        aboutMe: ''
    };

    skillResults.forEach(row => {
        const cat = safeGetText(row.properties.Category).toLowerCase();
        const name = safeGetText(row.properties.Name);
        if (cat === 'frontend') payload.frontend.push(name);
        else if (cat === 'backend') payload.backend.push(name);
        else payload.other.push(name);
    });

    profResults.forEach(row => {
        const key = safeGetText(row.properties.Key);
        const val = safeGetText(row.properties.Value);
        if (key === 'intro' && val) {
            try { payload.intro = JSON.parse(val); } catch(e) { payload.intro = { name: 'Mohit', role: 'Frontend Developer' }; }
        } else if (key === 'aboutMe') {
            payload.aboutMe = val;
        }
    });

    cache.set('notion_profile', payload);
    return res.json(payload);
  } catch (error) {
    console.error('Error fetching Notion data:', error.message);
    try {
        const fallbackData = JSON.parse(fs.readFileSync(path.join(__dirname, '../../src/assets/skills.json'), 'utf-8'));
        return res.json(fallbackData);
    } catch (e) {
        return res.status(500).json({ error: 'Fallback Failed' });
    }
  }
});

app.use('/api', router); // Standard mapping
app.use('/.netlify/functions/api', router); // Lambda direct execution mapping

export const handler = serverless(app);
