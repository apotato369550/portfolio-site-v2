import dotenv from "dotenv";
dotenv.config({ path: '../.env' });

import GithubCommitsModel from "../models/GitHubCommits.js";
import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from 'url';

const GITHUB_USERNAME = process.env.GITHUB_USERNAME || null;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || null;
const MAX_REPOSITORIES = 10; // Hard limit on number of repositories to fetch

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// fix the following error:
// The \"cb\" argument must be of type function. Received undefined
export async function fetchGithubData() {
    try {
        // Set up headers for authentication if token is provided
        const headers = {};
        if (GITHUB_TOKEN) {
            headers['Authorization'] = `token ${GITHUB_TOKEN}`;
            headers['User-Agent'] = 'GitHub-Portfolio-Fetcher';
        }

        // Fetch repositories sorted by last push date (most recent first)
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=${MAX_REPOSITORIES}`, {
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
        console.log(`Fetched ${repos.length} repositories (sorted by recent activity)`);
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

        // Process repositories (they're already sorted by recent activity)
        for (const repo of repos) {
            console.log(`Fetching commits for repository: ${repo.name} (last pushed: ${repo.pushed_at})`);
            
            // Fetch commits for this repository
            const commitsResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits?per_page=1`, {
                headers
            });
            
            if (!commitsResponse.ok) {
                console.warn(`Failed to fetch commits for ${repo.name}: ${commitsResponse.status} - ${commitsResponse.statusText}`);
                // Still include the repo info even if we can't get commits
                results.push({
                    name: repo.name,
                    description: repo.description || "No description",
                    last_commit_message: "Could not fetch latest commit",
                    date: repo.pushed_at, // Use repo's last push date as fallback
                    url: repo.html_url,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language
                });
                continue;
            }
            
            const commits = await commitsResponse.json();

            if (commits && Array.isArray(commits) && commits.length > 0) {
                const latestCommit = commits[0];
                results.push({
                    name: repo.name,
                    description: repo.description || "No description",
                    last_commit_message: latestCommit.commit.message,
                    date: latestCommit.commit.author.date,
                    url: repo.html_url,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language
                });
            } else {
                console.log(`No commits found for repository: ${repo.name}`);
                // Include repo info even without commits
                results.push({
                    name: repo.name,
                    description: repo.description || "No description",
                    last_commit_message: "No commits found",
                    date: repo.pushed_at,
                    url: repo.html_url,
                    stars: repo.stargazers_count,
                    forks: repo.forks_count,
                    language: repo.language
                });
            }
        }

        // Create data directory if it doesn't exist
        const dataDir = path.join(__dirname, "data");
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        const filePath = path.join(dataDir, "github_commits.json");
        fs.writeFileSync(filePath, JSON.stringify(results, null, 2));
        console.log(`✅ GitHub data saved to ${filePath}`);
        console.log(`📊 Fetched ${results.length} repositories (limited to ${MAX_REPOSITORIES})`);
        
        return results;
    } catch (error) {
        console.error("❌ Failed to fetch GitHub data:", error);
        throw error;
    }
}

export async function fetchAndStoreCommits() {
    const commits = await fetchGithubData();

    await GithubCommitsModel.deleteMany({});
    await GithubCommitsModel.insertMany(commits);

    await fs.writeFile("./data/github_commits.json", JSON.stringify(commits, null, 2));
}
