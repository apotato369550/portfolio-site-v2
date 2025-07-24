const mongoose = require("mongoose");

const DataCampProjectsSchema = new mongoose.Schema({
    project_title: {
        type: String,
        required: true,
    },
    project_description: {
        type: String,
        required: true,
    },
    project_image: {
        type: String,
        required: true,
    },
});

const DataCampProjectsModel = mongoose.model("DataCampProjects", DataCampProjectsSchema);

module.exports = DataCampProjectsModel;