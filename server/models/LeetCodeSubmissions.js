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
    
})