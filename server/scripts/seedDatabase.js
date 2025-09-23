import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';

import DataCampCoursesModel from '../models/DataCampCourses.js';
import DataCampProjectsModel from '../models/DataCampProjects.js';
import GithubCommitsModel from '../models/GitHubCommits.js';
import ProjectModel from '../models/GitHubProjects.js';
import LeetCodeSubmissionsModel from '../models/LeetCodeSubmissions.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '../.env') });

const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
    throw new Error('MONGODB_URI is not defined in .env file');
}

async function loadJSON(filePath) {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

async function seedModel(model, filePath) {
    const data = await loadJSON(filePath);
    await model.deleteMany();
    await model.insertMany(data);
    console.log(`Seeded ${model.modelName}`);
}

async function main() {
    console.log("Mongodb URI: " + mongoUri);
    await mongoose.connect(mongoUri)
        .then(() => console.log("✅ Connected to MongoDB"))
        .catch(err => console.error("❌ Connection error:", err));

    await seedModel(DataCampCoursesModel, '../data/courses_and_certs.json');
    await seedModel(DataCampProjectsModel, '../data/datacamp_projects.json');
    await seedModel(GithubCommitsModel, '../data/github_commits.json');
    await seedModel(ProjectModel, '../data/projects.json');
    await seedModel(LeetCodeSubmissionsModel, '../data/leetcode_submissions.json');

    mongoose.disconnect();
}

main().catch(error => {
    console.log(error);
    mongoose.disconnect();
})