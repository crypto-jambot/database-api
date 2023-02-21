import { Router } from "express";
import "../utils/mongoConfig";
import { pathModel } from "../models/Path";
import { storage } from "../utils/mongoConfig";
import { makeRequest } from "../utils/requestUtil";

export const publishRouter = Router();
type MongoBody = {
    bucket: string;
    fileName: string;
};

publishRouter.post("/", async (req, res) => {
    const { fileName, bucket } = req.body as MongoBody;
    if (!fileName || !bucket) {
        res.status(400).json({
            message: "fileName and bucket required in post body.",
        });
        return;
    }
    await makeRequest(res, async () => {
        const data = (await storage.bucket(bucket).file(fileName).download())
            .toString()
            .split("\n")
            .filter((line) => line !== "")
            .map((line) => JSON.parse(line));
        const paths = await pathModel.create(data);
        return { responseCode: 201, data: paths.length };
    });
});
