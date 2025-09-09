import express, { request } from "express";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from 'url';
import { runQueryWithFallback } from "../utils/fallbackReader.js";
import DataCampCoursesModel from "../models/DataCampCourses.js";
import DataCampProjectsModel from "../models/DataCampProjects.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const router = express.Router();

router.get("/datacamp-courses", async (requrest, response) => {
    const data = await runQueryWithFallback(
        () => DataCampCoursesModel.find({}),
        path.join(__dirname, "../data/courses_and_certs.json")
    );
    response.json(data);
});

router.get("/datacamp-projects", async (request, response) => {
    const data = await runQueryWithFallback(
        () => DataCampProjectsModel.find({}),
        path.join(__dirname, "../data/datacamp_projects.json")
    )
    response.json(data);
})

router.post("/sync-datacamp-projects-json-to-db", async (req, res) => {
    try {
        const jsonData = JSON.parse(await fs.readFile("server/data/datacamp_projects.json", "utf-8"));
        await DataCampProjectsModel.deleteMany({});
        await DataCampProjectsModel.insertMany(jsonData);
        res.json({ message: "Synced JSON to DB successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.post("/sync-datacamp-projects-db-to-json", async (req, res) => {
    try {
        const dbData = await DataCampProjectsModel.find({});
        await fs.writeFile("server/data/datacamp_projects.json", JSON.stringify(dbData, null, 4));
        res.json({ message: "Synced DB to JSON successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

export default router;