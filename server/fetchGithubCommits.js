import dotenv from "dotenv";
dotenv.config();

import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from 'url';

const GITHUB_USERNAME = "apotato369550";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;


// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchGithubData() {
    try {
        // Set up headers for authentication if token is provided
        const headers = {};
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
            headers['User-Agent'] = 'GitHub-Portfolio-Fetcher';
        }

        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`, {
            headers
        });
        
        // Check if the response is successful
        if (!reposResponse.ok) {
            if (reposResponse.status === 403) {
                const resetTime = reposResponse.headers.get('x-ratelimit-reset');
                const resetDate = new Date(resetTime * 1000);
                throw new Error(`GitHub API rate limit exceeded. Rate limit resets at: ${resetDate.toLocaleString()}`);
            }
            throw new Error(`GitHub API error: ${reposResponse.status} - ${reposResponse.statusText}`);
        }
        
        const repos = await reposResponse.json();
        
        // Debug: Log what we actually received
        console.log("GitHub API Response:", repos);
        console.log("Response type:", typeof repos);
        console.log("Is array:", Array.isArray(repos));
        
        // Check if repos is an array
        if (!Array.isArray(repos)) {
            console.error("Expected an array but got:", repos);
            throw new Error("GitHub API did not return an array of repositories");
        }
        
        if (repos.length === 0) {
            console.log("No repositories found for user:", GITHUB_USERNAME);
            return [];
        }

        const results = [];

        for (const repo of repos) {
            console.log(`Fetching commits for repository: ${repo.name}`);
            
            // Fixed: Added missing 'fetch' call with authentication
            const commitsResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`, {
                headers
            });
            
            if (!commitsResponse.ok) {
                console.warn(`Failed to fetch commits for ${repo.name}: ${commitsResponse.status} - ${commitsResponse.statusText}`);
                continue; // Skip this repo and continue with others
            }
            
            const commits = await commitsResponse.json();

            if (commits && Array.isArray(commits) && commits.length > 0) {
                const latestCommit = commits[0];
                results.push({
                    name: repo.name,
                    description: repo.description || "No description",
                    last_commit_message: latestCommit.commit.message,
                    date: latestCommit.commit.author.date,
                    url: repo.html_url
                });
            } else {
                console.log(`No commits found for repository: ${repo.name}`);
            }
        }

        // Create data directory if it doesn't exist
        const dataDir = path.join(__dirname, "data");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        const filePath = path.join(dataDir, "github_commits.json");
        fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
        console.log(`Github data saved to ${filePath}`);
        
        return results;
    } catch (error) {
        console.error("❌ Failed to fetch GitHub data:", error);
        throw error;
    }
}

export default fetchGithubData;

/*
fetchGithubData().catch((err) => {
    console.error("❌ Failed to fetch GitHub data:", err);
});
*/

/*
api improvement prompt

Hi Claude! I'd like some clarification, some advice, and a few modifications to my existing code for a program that utilizes GitHub's offical API. I'm currently working on a portfolio site project and I want to manually


 */