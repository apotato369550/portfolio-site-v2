import express from "express";
import path from "path";
import { fileURLToPath } from 'url';
import LeetCodeSubmissionsModel from "../models/LeetCodeSubmissions.js"
import { runQueryWithFallback } from "../utils/fallbackReader.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/leetcode-submissions", async (requrest, response) => {
    const data = await runQueryWithFallback(
        () => LeetCodeSubmissionsModel.find({}),
        path.join(__dirname, "../data/leetcode_submission.json")
    );
    response.json(data);
});

export default router;