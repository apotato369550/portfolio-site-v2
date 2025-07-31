import cron from "node-cron";
import { fetchAndStoreCommits } from "../fetchers/fetchGithubCommits";
import { fetchAndStoreSubmissions } from "../fetchers/fetchLeetcodeSubmissions";

cron.schedule("0 * * * *", async () => {
    console.log("Running cron job to update commits & submissions");
    await fetchAndStoreCommits();
    await fetchAndStoreSubmissions();
});