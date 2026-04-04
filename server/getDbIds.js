const { Client } = require('@notionhq/client');
require('dotenv').config({ path: __dirname + '/.env' });
const fs = require('fs');
const path = require('path');

const notion = new Client({ auth: process.env.NOTION_SECRET });
const parentId = '338f9a9d123c80b08679d3f96b57b8e3';

async function main() {
    try {
        const response = await notion.blocks.children.list({ block_id: parentId });
        const databases = response.results.filter(b => b.type === 'child_database');

        const mapping = {};
        for (const db of databases) {
            mapping[db.child_database.title] = db.id;
        }

        console.log("Found Databases:", mapping);

        let envFile = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
        envFile = envFile.replace(/NOTION_PROJECTS_DB_ID=.*/, `NOTION_PROJECTS_DB_ID=${mapping['Projects']}`);
        envFile = envFile.replace(/NOTION_EXPERIENCE_DB_ID=.*/, `NOTION_EXPERIENCE_DB_ID=${mapping['Experience']}`);

        if (envFile.includes('NOTION_EDUCATION_DB_ID=')) {
            envFile = envFile.replace(/NOTION_EDUCATION_DB_ID=.*/, `NOTION_EDUCATION_DB_ID=${mapping['Education']}`);
        } else {
            envFile += `\nNOTION_EDUCATION_DB_ID=${mapping['Education']}`;
        }

        envFile += `\nNOTION_SKILLS_DB_ID=${mapping['Skills']}`;
        envFile += `\nNOTION_PROFILE_DB_ID=${mapping['Profile Info'] || ''}`;

        fs.writeFileSync(path.join(__dirname, '.env'), envFile);
        console.log("Successfully wrote mapping to .env!");

        // Add the missing aboutMe block
        if (mapping['Profile Info']) {
            const skillsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/assets/skills.json'), 'utf-8'));
            try {
                await notion.pages.create({
                    parent: { database_id: mapping['Profile Info'] },
                    properties: {
                        Key: { title: [{ text: { content: 'aboutMe' } }] },
                        Value: { rich_text: [{ text: { content: skillsData.aboutMe || '' } }] }
                    }
                });
                console.log("Successfully populated Profile Info database with aboutMe row!");
            } catch (e) {
                console.log("Profile Info row already populated or error:", e.message);
            }
        }

    } catch (e) {
        console.error(e.message);
    }
}
main();
