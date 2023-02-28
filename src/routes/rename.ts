import { Router } from "express";
import "../utils/mongoConfig";
import { connection } from "mongoose";
import { makeRequest } from "../utils/requestUtil";

export const renameRouter = Router();

renameRouter.put("/", async (req, res) => {
    await makeRequest(res, async () => {
        await connection.db.renameCollection("trees", "temp_trees");
        await connection.db.renameCollection("backfill_trees", "trees");
        await connection.db.renameCollection("temp_trees", "backfill_trees");
        return { responseCode: 202, data: "Collections successfully renamed" };
    });
});
