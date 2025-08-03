import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import fetchGithubData from "./fetchers/fetchGithubCommits.js";
import fetchLeetCodeData from "./fetchers/fetchLeetcodeSubmissions.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = 5000;
const mongoUri = process.env.MONGODB_URI

app.use(express.json());
app.use(cors());

// connect to mongodb via mongoose
mongoose.connect(mongoUri);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});

// add github, datacamp, and leetcode routes here :V

// TODO: Add endpoint verification. Literally NOTHING is stopping users from spamming this endpoint lmao
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

app.get("/refresh-leetcode", async (req, res) => {
    try {
        console.log("🔄 Manual GitHub data refresh triggered...");
        const data = await fetchLeetCodeData();
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

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
