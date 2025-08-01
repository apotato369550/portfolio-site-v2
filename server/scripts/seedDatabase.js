import mongoose from 'mongoose';
import fs from 'fs';
import path from 'path';
import dotenv from 'dotenv';

import DataCampCoursesModel from '../models/DataCampCourses.js';
import DataCampProjectsModel from '../models/DataCampProjects.js';
import GithubCommitsModel from '../models/GitHubCommits.js';
import ProjectModel from '../models/GitHubProjects.js';
import LeetCodeSubmissionsModel from '../models/LeetCodeSubmissions.js';
import { error } from 'console';

dotenv.config();

const mongoUri = process.env.MONGODB_URI

async function loadJSON(filePath) {
    data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data);
}

async function seedModel(model, filePath) {
    const data = await loadJSON(filePath);
    await model.deleteMany();
    await model.insertMany(data);
    console.log(`Seeded ${model.modelName}`);
}

async function main() {
    await mongoose.connect(mongoUri);

    console.log("Connected to MongoDB");

    await seedModel(DataCampCoursesModel, 'data/datacamp_project.json');
    await seedModel(DataCampProjectsModel, 'data/datacamp_projects.json');
    await seedModel(GithubCommitsModel, 'data/github_commits.json');
    await seedModel(ProjectModel, 'data/projects.json');
    await seedModel(LeetCodeSubmissionsModel, 'data/leetcode_submissions.json');

    mongoose.disconnect();
}

main().catch(error => {
    console.log(error);
    mongoose.disconnect();
})