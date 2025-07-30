import express from "express";
import { runQueryWithFallback } from "../utils/fallbackReader";
import ProjectModel from "../models/GitHubProjects";

const router = express.Router();

/* TODO: Create admin upload routes in the future */

export default router;