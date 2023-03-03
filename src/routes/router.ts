import { Router } from "express";
import { publishRouter } from "./publish";
import { renameRouter } from "./rename";
import { deleteRouter } from "./delete";

export const router = Router();

router.use("/publish", publishRouter);
router.use("/rename", renameRouter);
router.use("/delete", deleteRouter);
