require('dotenv').config({ path: __dirname + '/.env' });
const axios = require('axios');

const notionAxios = axios.create({
    baseURL: 'https://api.notion.com/v1',
    headers: {
        'Authorization': `Bearer ${process.env.NOTION_SECRET}`,
        'Notion-Version': '2022-06-28',
        'Content-Type': 'application/json'
    }
});

async function main() {
    try {
        console.log("Fetching Skills...");
        const res = await notionAxios.post(`/databases/${process.env.NOTION_SKILLS_DB_ID}/query`);
        console.log("Total skills retrieved:", res.data.results.length);

        res.data.results.forEach((row, idx) => {
            if (idx < 2) console.log("Sample Row:", JSON.stringify(row.properties, null, 2));

            // Replicate safeGetText
            let name = 'UNKNOWN';
            let cat = 'UNKNOWN';

            const nProp = row.properties.Name;
            if (nProp && nProp.title && nProp.title.length > 0) name = nProp.title[0].plain_text;

            const cProp = row.properties.Category;
            if (cProp && cProp.rich_text && cProp.rich_text.length > 0) cat = cProp.rich_text[0].plain_text;

            // Only print if there's a problem or it's NEW
            // We know the original ones had valid frontend/backend/other
            if (!['frontend', 'backend', 'other'].includes(cat.toLowerCase())) {
                console.log(`Unmatched or new category: name=${name}, category=${cat}`);
            }
        });

    } catch (e) {
        console.error(e.message);
    }
}
main();
