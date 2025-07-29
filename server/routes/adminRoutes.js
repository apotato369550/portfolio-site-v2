import express from "express";
import { runQueryWithFallback } from "../utils/fallbackReader";
import ProjectModel from "../models/GitHubProjects";

const router = express.Router();

// figure out how to upload photos ????
router.post("/github-projects", async (request, response) => {
    const data = request.body;
    await ProjectModel.insertOne(data);
})

export default router;