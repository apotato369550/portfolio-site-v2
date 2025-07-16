import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import { LeetCode, Credential } from "leetcode-query";
import { fileURLToPath } from 'url';

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || null;
const LEETCODE_SESSION_COOKIE = process.env.LEETCODE_SESSION_COOKIE || null;
const MAX_SUBMISSIONS = 10; // Hard limit on number of submissions to fetch

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchLeetCodeData() {
    try {
        let leetcode;
        
        // Initialize LeetCode client with optional authentication
        if (LEETCODE_SESSION_COOKIE) {
            console.log("Authenticating with LeetCode using session cookie...");
            const credential = new Credential();
            await credential.init(LEETCODE_SESSION_COOKIE);
            leetcode = new LeetCode(credential);
            console.log("✅ Successfully authenticated with LeetCode");
        } else {
            console.log("No session cookie provided, proceeding without authentication");
            console.log("Note: Only public data will be accessible");
            leetcode = new LeetCode();
        }

        // Try to fetch all submissions first (requires authentication)
        let submissions = [];
        
        if (LEETCODE_SESSION_COOKIE) {
            console.log(`Fetching all submissions for authenticated user...`);
            try {
                const submissionData = await leetcode.submissions({ limit: MAX_SUBMISSIONS, offset: 0 });
                submissions = submissionData.submission || submissionData || [];
                console.log(`✅ Retrieved ${submissions.length} submissions using authenticated API`);
            } catch (authError) {
                console.log(`⚠️  Authenticated submissions failed: ${authError.message}`);
                console.log(`Falling back to public user profile...`);
            }
        }
        
        // Fallback to public recent submissions if authenticated method failed or no auth
        if (submissions.length === 0) {
            console.log(`Fetching user profile for: ${LEETCODE_USERNAME}`);
            const userData = await leetcode.user(LEETCODE_USERNAME);
            
            // Debug: Log the full user data structure
            console.log("User data keys:", Object.keys(userData));
            console.log("Recent submissions:", userData.recentSubmissions);
            
            submissions = userData.recentSubmissions || [];
        }
        
        // Limit submissions to MAX_SUBMISSIONS
        const limitedSubmissions = submissions.slice(0, MAX_SUBMISSIONS);
        
        // Debug: Log what we actually received
        console.log(`Found ${submissions.length} recent submissions, processing ${limitedSubmissions.length}`);
        console.log("Response type:", typeof submissions);
        console.log("Is array:", Array.isArray(submissions));
        
        // Check if submissions is an array
        if (!Array.isArray(submissions)) {
            console.error("Expected an array but got:", submissions);
            throw new Error("LeetCode API did not return an array of submissions");
        }
        
        if (limitedSubmissions.length === 0) {
            console.log("No recent submissions found for user:", LEETCODE_USERNAME);
            return [];
        }

        const results = [];

        // Process submissions
        for (const submission of limitedSubmissions) {
            console.log(`Processing submission: ${submission.title || submission.titleSlug || submission.problem?.title || 'Unknown Problem'}`);
            
            // Format date to MM/DD/YYYY format
            let formattedDate = "Unknown Date";
            if (submission.timestamp) {
                const date = new Date(submission.timestamp * 1000); // Convert Unix timestamp to milliseconds
                formattedDate = date.toLocaleDateString('en-US');
            } else if (submission.time) {
                const date = new Date(submission.time * 1000);
                formattedDate = date.toLocaleDateString('en-US');
            }
            
            // Extract status - handle different response structures
            const status = submission.statusDisplay || submission.status || "Unknown";
            
            // Extract problem name - handle different response structures
            const problemName = submission.title || submission.titleSlug || submission.problem?.title || "Unknown Problem";
            
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
        if (error.message.includes("authentication") || error.message.includes("credential")) {
            console.error("💡 Tip: Make sure LEETCODE_SESSION_COOKIE is set in your .env file");
            console.error("💡 To get your session cookie: Login to LeetCode → Open DevTools → Application → Cookies → Copy 'LEETCODE_SESSION' value");
        } else if (error.message.includes("rate limit")) {
            console.error("💡 Tip: LeetCode API rate limit exceeded. Please try again later.");
        } else if (error.message.includes("user not found")) {
            console.error("💡 Tip: Please check if the username is correct");
        }
        
        throw error;
    }
}

export default fetchLeetCodeData;