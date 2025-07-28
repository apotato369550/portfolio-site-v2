import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetchGithubData from "./fetchers/fetchGithubCommits.js";
import fetchLeetCodeData from "./fetchers/fetchLeetcodeSubmissions.js";

// models
import DataCampCoursesModel from './models/DataCampCourses.js';
import DataCampProjectsModel from './models/DataCampProjects.js';
import GithubCommitsModel from './models/GithubCommits.js';
import GitHubProjectModel from './models/GitHubProject.js';
import LeetCodeSubmissionsModel from './models/LeetCodeSubmissions.js';

const app = express();
const port = 5000;


app.use(express.json());
app.use(cors());

// connect to mongodb via mongoose
mongoose.connect("mongodb://localhost:27017/portfolio-site");

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// Optional: Add an endpoint to manually trigger GitHub data refresh
app.get("/refresh-github", async (req, res) => {
    try {
        console.log("🔄 Manual GitHub data refresh triggered...");
        const data = await fetchGithubData();
        res.json({ 
            success: true, 
            message: "GitHub data refreshed successfully", 
            repositoryCount: data.length 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to refresh GitHub data", 
            error: error.message 
        });
    }
});

// Optional: Add an endpoint to serve the GitHub data
app.get("/github-data", async (req, res) => {
    try {
        const fs = await import("fs");
        const path = await import("path");
        const { fileURLToPath } = await import("url");
        
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);
        const filePath = path.join(__dirname, "data", "github_commits.json");
        
        if (fs.existsSync(filePath)) {
            const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
            res.json({ success: true, data });
        } else {
            res.status(404).json({ success: false, message: "GitHub data not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Error reading GitHub data", error: error.message });
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// import cron from "node-cron";

// Call the function to fetch GitHub data once on startup
/*
console.log("🚀 Starting server and fetching GitHub data...");
fetchGithubData()
    .then(() => {
        console.log("✅ Initial GitHub data fetch completed");
    })
    .catch((error) => {
        console.error("❌ Initial GitHub data fetch failed:", error);
    });

fetchLeetCodeData()
    .then(() => {
        console.log("✅ Initial Leetcode data fetch completed");
    })
    .catch((error) => {
        console.error("❌ Initial Leetcode data fetch failed:", error);
    });

*/


// Uncomment the code below to enable hourly cron job
// Make sure to install node-cron: npm install node-cron
/*
console.log("⏰ Setting up hourly cron job for GitHub data fetching...");
cron.schedule('0 * * * *', () => {
    console.log("🔄 Running scheduled GitHub data fetch...");
    fetchGithubData()
        .then(() => {
            console.log("✅ Scheduled GitHub data fetch completed");
        })
        .catch((error) => {
            console.error("❌ Scheduled GitHub data fetch failed:", error);
        });
        
    fetchLeetCodeData()
        .then(() => {
            console.log("✅ Scheduled Leetcode data fetch completed");
        })
        .catch((error) => {
            console.error("❌ Scheduled Leetcode data fetch failed:", error);
        });
});
*/