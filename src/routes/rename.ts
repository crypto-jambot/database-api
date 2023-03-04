import { Router } from "express";
import "../utils/mongoConfig";
import { makeRequest } from "../utils/requestUtil";

export const renameRouter = Router();

renameRouter.put("/", async (req, res) => {
    await makeRequest(res, async ({ db }) => {
        await db.renameCollection("trees", "temp_trees");
        await db.renameCollection("backfill_trees", "trees");
        await db.renameCollection("temp_trees", "backfill_trees");
        return { responseCode: 202, data: "Collections successfully renamed" };
    });
});
