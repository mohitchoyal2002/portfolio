require('dotenv').config({ path: __dirname + '/.env' });
const express = require('express');
const cors = require('cors');
const NodeCache = require('node-cache');
const { Client } = require('@notionhq/client');

const app = express();
const port = process.env.PORT || 5000;
const cache = new NodeCache({ stdTTL: 3600 }); // Cache for 60 seconds for instant Notion updates

app.use(cors());
app.use(express.json());

const axios = require('axios');

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

const safeGetUrl = (prop) => {
    if (prop && prop.url) return prop.url;
    return null;
};

app.get('/api/profile', async (req, res) => {
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

    // Sort skills into appropriate arrays
    skillResults.forEach(row => {
        const cat = safeGetText(row.properties.Category).toLowerCase();
        const name = safeGetText(row.properties.Name);
        if (cat === 'frontend') payload.frontend.push(name);
        else if (cat === 'backend') payload.backend.push(name);
        else payload.other.push(name);
    });

    // Populate profile keys
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

    // GRACEFUL FALLBACK STRATEGY (Retained for max safety)
    console.log("Triggering Graceful Fallback Strategy: Serving local skills.json");
    try {
        const fs = require('fs');
        const fallbackData = JSON.parse(fs.readFileSync(__dirname + '/../src/assets/skills.json', 'utf-8'));
        return res.json(fallbackData);
    } catch (e) {
        return res.status(500).json({ error: 'Fallback Failed' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
