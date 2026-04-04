require('dotenv').config({ path: __dirname + '/server/.env' });
const axios = require('axios');
const notionAxios = axios.create({
    baseURL: 'https://api.notion.com/v1',
    headers: {
        'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
});
async function test() {
    try {
        const res = await notionAxios.post(`/databases/${process.env.NOTION_PROJECTS_DB_ID}/query`);
        console.log("projRes.data keys:", Object.keys(res.data));
    } catch(e) { console.error(e.message); }
}
test();
