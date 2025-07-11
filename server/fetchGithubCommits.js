import fs from "fs";
import path from "path";
import fetch from "node-fetch";
import { fileURLToPath } from 'url';

const GITHUB_USERNAME = "apotato369550";

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function fetchGithubData() {
    try {
        const reposResponse = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos`);
        const repos = await reposResponse.json();

        const results = [];

        for (const repo of repos) {
            // Fixed: Added missing 'fetch' call
            const commitsResponse = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repo.name}/commits`);
            const commits = await commitsResponse.json();

            if (commits && commits.length > 0) {
                const latestCommit = commits[0];
                results.push({
                    name: repo.name,
                    description: repo.description || "No description",
                    last_commit_message: latestCommit.commit.message,
                    date: latestCommit.commit.author.date,
                    url: repo.html_url
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