import express, { request } from "express";
import GithubCommitsModel from "../models/GitHubCommits.js";
import ProjectModel from "../models/GitHubProjects.js";
import { runQueryWithFallback } from "../utils/fallbackReader.js";
import fs from "fs/promises";

const router = express.Router();

router.get("/recent-commits", async (requrest, response) => {
    const data = await runQueryWithFallback(
        () => GithubCommitsModel.find({}),
        "../data/github_commits.json"
    );
    response.json(data);
});

router.get("/recent-projects", async (request, response) => {
    // const json = await fs.readFile("../data/projects.json", "utf-8");
    const data = await runQueryWithFallback(
        () => ProjectModel.find({}),
        "../data/projects.json"
    );

    response.json(data);
});

export default router;