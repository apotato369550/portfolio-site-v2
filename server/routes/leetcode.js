import express from "express";
import LeetCodeSubmissionsModel from "../models/LeetCodeSubmissions.js"
import { runQueryWithFallback } from "../utils/fallbackReader.js";

const router = express.Router();

router.get("/leetcode-submissions", async (requrest, response) => {
    const data = await runQueryWithFallback(
        () => LeetCodeSubmissionsModel.find({}),
        "../data/leetcode_submission.json"
    );
    response.json(data);
});

export default router;