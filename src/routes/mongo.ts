import { Router } from "express";
import "../utils/mongoConfig";
import { pathModel } from "../models/Path";
import { storage } from "../utils/mongoConfig";

export const mongoRoute = Router();
type MongoBody = {
    bucket: string;
    fileName: string;
};

mongoRoute.post("/", async (req, res) => {
    const { fileName, bucket } = req.body as MongoBody;
    if (!fileName || !bucket) {
        res.status(400).json({
            message: "fileName and bucket required in post body.",
        });
    }
    try {
        const data = (await storage.bucket(bucket).file(fileName).download())
            .toString()
            .split("\n")
            .filter((line) => line !== "")
            .map((line) => JSON.parse(line));
        const paths = await pathModel.create(data);
        // Will be used for finding paths greater than timestamp - 24 hours
        // const path = await pathModel.findOne({
        //     createdAt: { $gte: Date.now() - 24 * 60 * 60 * 1000 },
        // });
        res.status(200).json({ message: paths.length });
    } catch (err: any) {
        const { name, message } = err;
        res.status(400).json({ errorType: name, message });
    }
});
