// must-haves
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// fetchers
import { fetchGithubData } from "./fetchers/fetchGithubCommits.js";
import { fetchLeetCodeData } from "./fetchers/fetchLeetcodeSubmissions.js";
import { fetchSampleData } from "./fetchers/fetcherSampleLeetcode.js";

// routes
import dataCampRoutes from "./routes/datacamp.js";
import githubRoutes from "./routes/github.js";
import leetcodeRoutes from "./routes/leetcode.js";
import contactRoutes from "./routes/contact.js";

// for .env loading
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '.env') });

const app = express();
const port = 3001;
const mongoUri = process.env.MONGODB_URI

app.use(express.json());
app.use(cors());
app.use('/api/projects/images', express.static(path.join(__dirname, 'assets', 'projects')));
app.use('/datacamp-images', express.static(path.join(__dirname, 'assets', 'datacamp-projects')));
app.use('/certs', express.static(path.join(__dirname, 'assets', 'certs')));
app.use('/courses', express.static(path.join(__dirname, 'assets', 'courses')));

// test me!!!
app.use("/api", dataCampRoutes);
app.use("/api", githubRoutes);
app.use("/api", leetcodeRoutes);
app.use("/api", contactRoutes);

// connect to mongodb via mongoose
mongoose.connect(mongoUri);

app.get("/", (req, res) => {
    res.send("Server is running 🚀");
});


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
        console.log("🔄 Manual Leetcode data refresh triggered...");
        const data = await fetchLeetCodeData();
        res.json({ 
            success: true, 
            message: "Leetcode data refreshed successfully", 
            repositoryCount: data.length 
        });
    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Failed to refresh Leetcode data", 
            error: error.message 
        });
    }
});

app.get("/refresh-sample", async (req, res) => {
    try {
        console.log("REFRESH DATA SAMPLE");
        await fetchSampleData();
    } catch (error) {
        console.log("ERROR");
        console.log(error);
    }
})



app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
