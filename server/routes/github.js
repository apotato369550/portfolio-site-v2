import express, { request } from "express";
import GithubCommitsModel from "../models/GitHubCommits";
import { runQueryWithFallback } from "../utils/fallbackReader";

const router = express.Router();

router.get("/recent-commits", async (requrest, response) => {
    const data = await runQueryWithFallback(
        () => GithubCommitsModel.find({}),
        "../data/github_commits.json"
    );
    response.json(data);
});

router.get("/recent-projects", async (request, response) => {
    
})

export default router;