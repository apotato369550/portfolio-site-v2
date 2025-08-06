// must-haves
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// fetchers
import { fetchAndStoreCommits } from "./fetchers/fetchGithubCommits.js";
import { fetchAndStoreSubmissions } from "./fetchers/fetchLeetcodeSubmissions.js";

// routes
import dataCampRoutes from "./routes/datacamp.js";
import githubRoutes from "./routes/github.js";
import leetcodeRoutes from "./routes/leetcode.js";

// for .env loading
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, '../../.env') });

const app = express();
const port = 5000;
const mongoUri = process.env.MONGODB_URI

app.use(express.json());
app.use(cors());

// test me!!!
app.use("/api", dataCampRoutes);
app.use("/api", githubRoutes);
app.use("/api", leetcodeRoutes);

// connect to mongodb via mongoose
mongoose.connect(mongoUri);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});


// TODO: Add endpoint verification. Literally NOTHING is stopping users from spamming this endpoint lmao
app.get("/refresh-github", async (req, res) => {
    try {
        console.log("🔄 Manual GitHub data refresh triggered...");
        await fetchAndStoreCommits();
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
        await fetchAndStoreSubmissions();
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
