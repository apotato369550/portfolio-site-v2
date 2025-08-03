import express, { request } from "express";
import fs from "fs/promises";
import { runQueryWithFallback } from "../utils/fallbackReader";
import DataCampCoursesModel from "../models/DataCampCourses";
import DataCampProjectsModel from "../models/DataCampProjects";

const router = express.Router();


router.get("/datacamp-courses", async (requrest, response) => {
    const data = await runQueryWithFallback(
        () => DataCampCoursesModel.find({}),
        "../data/courses_and_certs.json"
    );
    response.json(data);
});

router.get("/datacamp-projects", async (request, response) => {
    const data = await runQueryWithFallback(
        () => DataCampProjectsModel.find({}),
        "../data/datacamp_projects.json"
    )
    response.json(data);
})

export default router;