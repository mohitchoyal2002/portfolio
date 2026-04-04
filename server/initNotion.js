const { Client } = require('@notionhq/client');
require('dotenv').config({ path: __dirname + '/.env' });
const fs = require('fs');
const path = require('path');
const axios = require('axios');

const notion = new Client({ auth: process.env.NOTION_SECRET });
const parentId = '338f9a9d123c80b08679d3f96b57b8e3';

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
        console.log("Connecting to Notion Page...");

        const skillsData = JSON.parse(fs.readFileSync(path.join(__dirname, '../src/assets/skills.json'), 'utf-8'));

        console.log("Generating Projects DB...");
        const resProj = await notionAxios.post('/databases', {
            parent: { type: 'page_id', page_id: parentId },
            title: [{ type: 'text', text: { content: 'Projects' } }],
            properties: {
                Name: { title: {} },
                Description: { rich_text: {} },
                Tech: { rich_text: {} },
                Github: { url: {} },
                Live: { url: {} },
                Image: { url: {} }
            }
        });
        const projectsDb = resProj.data;

        for (const project of skillsData.projects) {
            let safeImageUrl = null;
            if (project.image && project.image.startsWith('http') && project.image.length < 2000) {
                safeImageUrl = project.image;
            }

            await notion.pages.create({
                parent: { database_id: projectsDb.id },
                properties: {
                    Name: { title: [{ text: { content: project.name || '' } }] },
                    Description: { rich_text: [{ text: { content: project.desc || '' } }] },
                    Tech: { rich_text: [{ text: { content: project.tech || '' } }] },
                    Github: { url: project.github || null },
                    Live: { url: project.link || null },
                    Image: { url: safeImageUrl }
                }
            });
        }

        console.log("Generating Experience DB...");
        const resExp = await notionAxios.post('/databases', {
            parent: { type: 'page_id', page_id: parentId },
            title: [{ type: 'text', text: { content: 'Experience' } }],
            properties: {
                Employer: { title: {} },
                Position: { rich_text: {} },
                Duration: { rich_text: {} },
                Work: { rich_text: {} },
                Tech: { rich_text: {} },
                Logo: { url: {} }
            }
        });
        const expDb = resExp.data;

        for (const exp of skillsData.experience) {
            let safeLogoUrl = null;
            if (exp.logo && exp.logo.startsWith('http') && exp.logo.length < 2000) {
                safeLogoUrl = exp.logo;
            }

            await notion.pages.create({
                parent: { database_id: expDb.id },
                properties: {
                    Employer: { title: [{ text: { content: exp.employer || '' } }] },
                    Position: { rich_text: [{ text: { content: exp.position || '' } }] },
                    Duration: { rich_text: [{ text: { content: exp.duration || '' } }] },
                    Work: { rich_text: [{ text: { content: exp.work || '' } }] },
                    Tech: { rich_text: [{ text: { content: exp.tech || '' } }] },
                    Logo: { url: safeLogoUrl }
                }
            });
        }

        console.log("Generating Education DB...");
        const resEdu = await notionAxios.post('/databases', {
            parent: { type: 'page_id', page_id: parentId },
            title: [{ type: 'text', text: { content: 'Education' } }],
            properties: {
                Degree: { title: {} },
                Institute: { rich_text: {} },
                Duration: { rich_text: {} }
            }
        });
        const eduDb = resEdu.data;

        for (const ed of skillsData.education) {
            await notion.pages.create({
                parent: { database_id: eduDb.id },
                properties: {
                    Degree: { title: [{ text: { content: ed.degree || '' } }] },
                    Institute: { rich_text: [{ text: { content: ed.institute || '' } }] },
                    Duration: { rich_text: [{ text: { content: ed.duration || '' } }] }
                }
            });
        }

        console.log("Generating Skills DB...");
        const resSkills = await notionAxios.post('/databases', {
            parent: { type: 'page_id', page_id: parentId },
            title: [{ type: 'text', text: { content: 'Skills' } }],
            properties: {
                Name: { title: {} },
                Category: { rich_text: {} }
            }
        });
        const skillsDb = resSkills.data;

        const populateSkills = async (arr, category) => {
            for (const skill of arr) {
                await notion.pages.create({
                    parent: { database_id: skillsDb.id },
                    properties: {
                        Name: { title: [{ text: { content: skill } }] },
                        Category: { rich_text: [{ text: { content: category } }] }
                    }
                });
            }
        };
        await populateSkills(skillsData.frontend, 'frontend');
        await populateSkills(skillsData.backend, 'backend');
        await populateSkills(skillsData.other, 'other');

        console.log("Generating Profile DB...");
        const resProfile = await notionAxios.post('/databases', {
            parent: { type: 'page_id', page_id: parentId },
            title: [{ type: 'text', text: { content: 'Profile Info' } }],
            properties: {
                Key: { title: {} },
                Value: { rich_text: {} }
            }
        });
        const profileDb = resProfile.data;

        await notion.pages.create({
            parent: { database_id: profileDb.id },
            properties: {
                Key: { title: [{ text: { content: 'intro' } }] },
                Value: { rich_text: [{ text: { content: JSON.stringify(skillsData.intro) } }] }
            }
        });
        await notion.pages.create({
            parent: { database_id: profileDb.id },
            properties: {
                Key: { title: [{ text: { content: 'aboutMe' } }] },
                Value: { rich_text: [{ text: { content: skillsData.aboutMe } }] }
            }
        });

        console.log("Writing ENV variables back to terminal for you to copy...");
        console.log("-----------------------------------------");
        console.log(`NOTION_PROJECTS_DB_ID=${projectsDb.id}`);
        console.log(`NOTION_EXPERIENCE_DB_ID=${expDb.id}`);
        console.log(`NOTION_EDUCATION_DB_ID=${eduDb.id}`);
        console.log(`NOTION_SKILLS_DB_ID=${skillsDb.id}`);
        console.log(`NOTION_PROFILE_DB_ID=${profileDb.id}`);
        console.log("-----------------------------------------");

        console.log("Done! All databases created in Notion.");
    } catch (error) {
        console.error("Error setting up Notion:", error.message);
        if (error.response && error.response.data) {
            console.error("Notion Error details:", JSON.stringify(error.response.data, null, 2));
        }
    }
}
main();
