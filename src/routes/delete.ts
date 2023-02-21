import { Router } from "express";
import "../utils/mongoConfig";
import { pathModel } from "../models/Path";
import { makeRequest } from "../utils/requestUtil";

export const deleteRouter = Router();

deleteRouter.delete("/", async (req, res) => {
    await makeRequest(res, async () => {
        const { deletedCount } = await pathModel.deleteMany();
        return {
            responseCode: 200,
            data: `${deletedCount} entries deleted from backfill_paths collection.`,
        };
    });
});
