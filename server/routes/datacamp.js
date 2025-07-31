import express, { request } from "express";
import fs from "fs/promises";

const router = express.Router();


router.get("/datacamp-courses", async (requrest, response) => {
    const json = await fs.readFile("../data/courses_and_certs.json", "utf-8");
    response.json(JSON.parse(json));
});

router.get("/datacamp-projects", async (request, response) => {
    const json = await fs.readFile("../data/datacamp_projects.json", "utf-8");
    response.json(JSON.parse(json));
})

export default router;