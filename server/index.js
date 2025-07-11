import express from "express";
import cors from "cors";
import fetchGithubData from "./fetchGithubCommits.js";

const app = express();
const port = 5000;

// Call the function to fetch GitHub data
fetchGithubData();

app.use(cors());

app.get("/", (req, res) => {
  res.send("Server is running 🚀");
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});