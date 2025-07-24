const mongoose = require("mongoose");

const LeetCodeSubmissionsSchema = new mongoose.Schema({
    problem_name: {
        type: String,
        required: true
    },
    submission_date: {
        type: String,
        required: true
    },
    submission_status: {
        type: String,
        required: true
    }
});

const LeetCodeSubmissionsModel = mongoose.model("LeetCodeSubmissions", LeetCodeSubmissionsSchema);

module.exports = LeetCodeSubmissionsModel;