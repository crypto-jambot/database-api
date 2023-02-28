import { Router } from "express";
import "../utils/mongoConfig";
import { treeListsModel } from "../models/Trees";
import { makeRequest } from "../utils/requestUtil";

export const deleteRouter = Router();

deleteRouter.delete("/", async (req, res) => {
    await makeRequest(res, async () => {
        const { deletedCount } = await treeListsModel.deleteMany();
        return {
            responseCode: 200,
            data: `${deletedCount} entries deleted from backfill_paths collection.`,
        };
    });
});
