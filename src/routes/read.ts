import { Router } from "express";
import { pathModel } from "../models/Path";

export const readRouter = Router();

readRouter.get("/", async (req, res) => {
    const parameters = req.query;
    if (!parameters?.address) {
        res.status(400).json({
            message: "Must pass in query parameter address",
        });
    }
    try {
        const path = await pathModel.find({
            createdAt: { $gte: new Date(Date.now() - 48 * 60 * 60 * 1000) },
            $text: { $search: `${parameters.address}` },
        });
        res.status(200).json({ path });
    } catch (err: any) {
        const { name, message } = err;
        res.status(400).json({ errorType: name, message });
    }
});
