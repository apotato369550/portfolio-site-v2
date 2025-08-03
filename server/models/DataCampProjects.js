import mongoose from "mongoose";

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
        required: false,
    },
});

const DataCampProjectsModel = mongoose.model("DataCampProjects", DataCampProjectsSchema);

// module.exports = DataCampProjectsModel;
export default DataCampProjectsModel;