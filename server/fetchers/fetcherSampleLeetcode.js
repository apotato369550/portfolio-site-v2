

import fs from "fs";
import path from "path";
const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || null;
const LEETCODE_SESSION_COOKIE = process.env.LEETCODE_SESSION_COOKIE || null;
const MAX_SUBMISSIONS = 10; // Hard limit on number of submissions to fetch

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


export async function fetchSampleData() {
    return;
}

// created sample fetcher