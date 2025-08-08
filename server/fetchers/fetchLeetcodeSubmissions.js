import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

import fs from "fs";
import path from "path";
import { LeetCode, Credential } from "leetcode-query";
import { fileURLToPath } from 'url';
import LeetCodeSubmissionsModel from "../models/LeetCodeSubmissions.js";

const LEETCODE_USERNAME = process.env.LEETCODE_USERNAME || null;
const LEETCODE_SESSION_COOKIE = process.env.LEETCODE_SESSION_COOKIE || null;
const MAX_SUBMISSIONS = 10; // Hard limit on number of submissions to fetch

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// fix the fetcher

function formatTimestamp(timestamp) {
    try {
        let date;
        
        // Debug logging
        console.log(`Raw timestamp: ${timestamp}, type: ${typeof timestamp}`);
        
        if (!timestamp) {
            return "Unknown Date";
        }
        
        // Handle different timestamp formats
        if (typeof timestamp === 'string') {
            // If it's already a date string, try to parse it
            date = new Date(timestamp);
        } else if (typeof timestamp === 'number') {
            // Check if it's in seconds (Unix timestamp) or milliseconds
            if (timestamp < 10000000000) {
                // Likely seconds (Unix timestamp) - convert to milliseconds
                date = new Date(timestamp * 1000);
            } else {
                // Likely already in milliseconds
                date = new Date(timestamp);
            }
        } else {
            return "Unknown Date";
        }
        
        // Validate the date
        if (isNaN(date.getTime())) {
            console.log(`Invalid date created from timestamp: ${timestamp}`);
            return "Unknown Date";
        }
        
        // Check if year is reasonable (between 2008-2030 for LeetCode)
        const year = date.getFullYear();
        if (year < 2008 || year > 2030) {
            console.log(`Suspicious year ${year} from timestamp ${timestamp}, trying alternative parsing`);
            
            // Try treating as milliseconds if it was treated as seconds
            if (typeof timestamp === 'number' && timestamp < 10000000000) {
                date = new Date(timestamp); // Don't multiply by 1000
            } else if (typeof timestamp === 'number' && timestamp >= 10000000000) {
                date = new Date(timestamp / 1000); // Divide by 1000 instead
            }
            
            // Check again
            const newYear = date.getFullYear();
            if (newYear < 2008 || newYear > 2030) {
                console.log(`Still suspicious year ${newYear}, returning current date`);
                return new Date().toLocaleDateString('en-US');
            }
        }
        
        return date.toLocaleDateString('en-US');
        
    } catch (error) {
        console.error(`Error formatting timestamp ${timestamp}:`, error);
        return "Unknown Date";
    }
}

export async function fetchLeetCodeData() {
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
                
                // Debug: Log the actual structure we received
                console.log("Submission data structure:", JSON.stringify(submissionData, null, 2));
                
                // Handle different possible response structures
                if (submissionData?.data?.submissionList?.submissions) {
                    submissions = submissionData.data.submissionList.submissions;
                } else if (submissionData?.submissionList?.submissions) {
                    submissions = submissionData.submissionList.submissions;
                } else if (submissionData?.data?.submissions) {
                    submissions = submissionData.data.submissions;
                } else if (submissionData?.submissions) {
                    submissions = submissionData.submissions;
                } else if (Array.isArray(submissionData?.data)) {
                    submissions = submissionData.data;
                } else if (Array.isArray(submissionData)) {
                    submissions = submissionData;
                }
                
                // Ensure we have an array
                if (!Array.isArray(submissions)) {
                    console.log("Submissions is not an array, got:", typeof submissions);
                    submissions = [];
                }
                
                console.log(`✅ Retrieved ${submissions.length} submissions using authenticated API`);
            } catch (authError) {
                console.log(`⚠️  Authenticated submissions failed: ${authError.message}`);
                console.log(`Falling back to public user profile...`);
            }
        }
        
        // Fallback to public recent submissions if authenticated method failed or no auth
        if (submissions.length === 0 && LEETCODE_USERNAME) {
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
            
            // Debug: Log the raw submission data for the first few submissions
            if (results.length < 3) {
                console.log("Raw submission data:", {
                    timestamp: submission.timestamp,
                    time: submission.time,
                    lang: submission.lang,
                    statusDisplay: submission.statusDisplay,
                    status: submission.status
                });
            }
            
            // Format date using improved logic
            let formattedDate = "Unknown Date";
            if (submission.timestamp) {
                formattedDate = formatTimestamp(submission.timestamp);
            } else if (submission.time) {
                formattedDate = formatTimestamp(submission.time);
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


export async function fetchAndStoreSubmissions() {
    const commits = await fetchLeetCodeData();

    await LeetCodeSubmissionsModel.deleteMany({});
    await LeetCodeSubmissionsModel.insertMany(commits);

    await fs.writeFile("./data/github_commits.json", JSON.stringify(commits, null, 2))
}