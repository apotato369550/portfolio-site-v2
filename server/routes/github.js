import express, { request } from "express";
import GithubCommitsModel from "../models/GitHubCommits";
import { runQueryWithFallback } from "../utils/fallbackReader";
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
    const json = await fs.readFile("../data/projects.json", "utf-8");
    response.json(JSON.parse(json));
});

export default router;