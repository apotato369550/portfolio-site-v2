import mongoose from "mongoose";

const GithubCommitsSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    last_commit_message: {
        type: String,
        required: true,
    },
    date: {
        type: String,
        required: true,
    },
    url: {
        type: String,
        required: true,
    },
    stars: {
        type: Number,
        required: true,
    },
    forks: {
        type: Number,
        required: true,
    },
    language: {
        type: String,
        required: true,
    },
});

const GithubCommitsModel = mongoose.model("GithubCommits", GithubCommitsSchema);

// module.exports = GithubCommitsModel;
export default GithubCommitsModel;