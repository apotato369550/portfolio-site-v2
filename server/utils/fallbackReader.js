import fs from "fs/promises";

export const runQueryWithFallback = async (dbQueryFunction, fallbackDataFilepath) => {
    try {
        const result = await dbQueryFunction();
        if (!result || result.length === 0) {
            throw new Error("Failed to get data from DB");
        }
        return result;
    } catch (error) {
        console.warn("DB failed, using fallback JSON: ", fallbackDataFilepath);
        const json = await fs.readFile(fallbackDataFilepath, "utf-8");
        return JSON.parse(json);
    }
}