import { Router } from "express";
import "../utils/mongoConfig";
import { connection } from "mongoose";
import { makeRequest } from "../utils/requestUtil";

export const renameRouter = Router();

renameRouter.put("/", async (req, res) => {
    await makeRequest(res, async () => {
        await connection.db.renameCollection("paths", "temp_paths");
        await connection.db.renameCollection("backfill_paths", "paths");
        await connection.db.renameCollection("temp_paths", "backfill_paths");
        return { responseCode: 202, data: "Collections successfully renamed" };
    });
});
