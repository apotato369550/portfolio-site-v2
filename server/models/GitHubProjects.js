const mongoose = require("mongoose");

const TechStackSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    icon: {
        type: String,
        required: true,
    },
});

const ProjectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    github_url: {
        type: String,
        required: true,
    },
    tech_stack: {
        type: [TechStackSchema],
        required: true
    }
})

const ProjectModel = mongoose.model("Project", ProjectSchema);

module.exports = ProjectModel;