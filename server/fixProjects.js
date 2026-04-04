require('dotenv').config({ path: __dirname + '/.env' });
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const { Client } = require('@notionhq/client');

const notion = new Client({ auth: process.env.NOTION_SECRET });
const dbId = process.env.NOTION_PROJECTS_DB_ID;

const notionAxios = axios.create({
    baseURL: 'https://api.notion.com/v1',
    headers: {
        'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
});

async function run() {
    try {
        console.log("Fetching existing blank rows...");
        const res = await notionAxios.post(`/databases/${dbId}/query`);

        console.log(`Deleting ${res.data.results.length} corrupted rows...`);
        for (const row of res.data.results) {
            await notion.pages.update({ page_id: row.id, archived: true });
        }

        console.log("Reading original static JSON data...");
        const skillsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/assets/skills.json'), 'utf-8'));

        console.log("Injecting proper rows into the active Notion DB...");
        for (const project of skillsData.projects) {
            let safeImageUrl = null;
            if (project.image && project.image.startsWith('http') && project.image.length < 2000) {
                safeImageUrl = project.image;
            }

            await notion.pages.create({
                parent: { database_id: dbId },
                properties: {
                    Name: { title: [{ text: { content: project.title || '' } }] },
                    Description: { rich_text: [{ text: { content: project.discription || '' } }] },
                    Tech: { rich_text: [{ text: { content: project.tech || '' } }] },
                    Github: { url: project.github || null },
                    Live: { url: project.live_link || null },
                    Image: { url: safeImageUrl }
                }
            });
            console.log(`Successfully injected: ${project.title}`);
        }

        console.log("Migration completely repaired!");
    } catch(e) {
        console.error(e.message);
    }
}
run();
