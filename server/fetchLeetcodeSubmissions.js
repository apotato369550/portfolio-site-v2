/*

Todo: 
Build a javascript file that uses the leetcode-query package that, given a username/account, 
scrapes their last 10 submissions (number can be set to constant) and saves it into a .json file as a list of objects, each object following this format:
{
"problem_name": "Koko Eating Bananas",
    "submission_date": "7/14/2025",
    "submission_status": "Accepted"
}
If password is needed, assume that it's stored in .env file and obtained through this format:
const TOKEN = process.env.TOKEN || null;

Made in the style o fetchGithubCommits.js

*/

import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { LeetCode } from "leetcode-query";
import { fileURLToPath } from 'url';

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || null;
const LEETCODE_PASSWORD = process.env.LEETCODE_PASSWORD || null;
const MAX_SUBMISSIONS = 10; // Hard limit on number of submissions to fetch

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchLeetCodeData() {
    try {
        // Initialize LeetCode client
        const lc = new LeetCode();
        
        // Authenticate if credentials are provided
        if (LEETCODE_USERNAME && LEETCODE_PASSWORD) {
            console.log("Authenticating with LeetCode...");
            await lc.login(LEETCODE_USERNAME, LEETCODE_PASSWORD);
            console.log("✅ Successfully authenticated with LeetCode");
        } else {
            console.log("No credentials provided, proceeding without authentication");
            console.log("Note: Some features may be limited without authentication");
        }

        // Fetch user submissions
        console.log(`Fetching submissions for user: ${LEETCODE_USERNAME}`);
        const submissions = await lc.getSubmissions(LEETCODE_USERNAME, MAX_SUBMISSIONS);
        
        // Debug: Log what we actually received
        console.log(`Fetched ${submissions.length} submissions`);
        console.log("Response type:", typeof submissions);
        console.log("Is array:", Array.isArray(submissions));
        
        // Check if submissions is an array
        if (!Array.isArray(submissions)) {
            console.error("Expected an array but got:", submissions);
            throw new Error("LeetCode API did not return an array of submissions");
        }
        
        if (submissions.length === 0) {
            console.log("No submissions found for user:", LEETCODE_USERNAME);
            return [];
        }

        const results = [];

        // Process submissions
        for (const submission of submissions) {
            console.log(`Processing submission: ${submission.title || submission.problem_name || 'Unknown Problem'}`);
            
            // Format date to MM/DD/YYYY format
            let formattedDate = "Unknown Date";
            if (submission.timestamp || submission.submission_date || submission.date) {
                const date = new Date(submission.timestamp || submission.submission_date || submission.date);
                formattedDate = date.toLocaleDateString('en-US');
            }
            
            // Extract status - handle different possible field names
            let status = "Unknown";
            if (submission.status) {
                status = submission.status;
            } else if (submission.statusDisplay) {
                status = submission.statusDisplay;
            } else if (submission.result) {
                status = submission.result;
            }
            
            // Extract problem name - handle different possible field names
            let problemName = "Unknown Problem";
            if (submission.title) {
                problemName = submission.title;
            } else if (submission.problem_name) {
                problemName = submission.problem_name;
            } else if (submission.problemTitle) {
                problemName = submission.problemTitle;
            }
            
            results.push({
                problem_name: problemName,
                submission_date: formattedDate,
                submission_status: status
            });
        }

        // Create data directory if it doesn't exist
        const dataDir = path.join(__dirname, "data");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        const filePath = path.join(dataDir, "leetcode_submissions.json");
        fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
        console.log(`✅ LeetCode data saved to ${filePath}`);
        console.log(`📊 Fetched ${results.length} submissions (limited to ${MAX_SUBMISSIONS})`);
        
        return results;
    } catch (error) {
        console.error("❌ Failed to fetch LeetCode data:", error);
        
        // Handle common errors
        if (error.message.includes("authentication") || error.message.includes("login")) {
            console.error("💡 Tip: Make sure LEETCODE_USERNAME and LEETCODE_PASSWORD are set in your .env file");
        } else if (error.message.includes("rate limit")) {
            console.error("💡 Tip: LeetCode API rate limit exceeded. Please try again later.");
        } else if (error.message.includes("user not found")) {
            console.error("💡 Tip: Please check if the username is correct");
        }
        
        throw error;
    }
}

export default fetchLeetCodeData;