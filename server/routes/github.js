import express from "express";
import GithubCommitsModel from "../models/GitHubCommits";
import { runQueryWithFallback } from "../utils/fallbackReader";

const router = express.Router();

router.get("/commits", async (requrest, response) => {
    const data = await runQueryWithFallback(
        () => GithubCommitsModel.find({}),
        "../data/github_commits.json"
    );
    response.json(data);
});

export default router;