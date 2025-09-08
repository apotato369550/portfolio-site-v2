import express, { request } from "express";
import path from "path";
import { fileURLToPath } from 'url';
import GithubCommitsModel from "../models/GitHubCommits.js";
import ProjectModel from "../models/GitHubProjects.js";
import { runQueryWithFallback } from "../utils/fallbackReader.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/recent-commits", async (requrest, response) => {
    const data = await runQueryWithFallback(
        () => GithubCommitsModel.find({}),
        path.join(__dirname, "../data/github_commits.json")
    );
    response.json(data);
});

router.get("/recent-projects", async (request, response) => {
    const data = await runQueryWithFallback(
        () => ProjectModel.find({}),
        path.join(__dirname, "../data/projects.json")
    );
    response.json(data);
});

export default router;