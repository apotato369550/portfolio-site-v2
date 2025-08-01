import mongoose from "mongoose";

const DataCampCoursesSchema = new mongoose.Schema({
    course_title: {
        type: String,
        required: true,
    },
    course_description: {
        type: String,
        required: true,
    },
    date_completed: {
        type: String,
        required: true,
    },
    certificate_url: {
        type: String,
        required: true,
    },
    image_url: {
        type: String,
        required: true,
    },
});

const DataCampCoursesModel = mongoose.model("DataCampCourses", DataCampCoursesSchema);

// module.exports = DataCampCoursesModel;
export default DataCampCoursesModel;