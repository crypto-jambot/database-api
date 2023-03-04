import { Router } from "express";
import { renameRouter } from "./rename";
import { deleteRouter } from "./delete";

export const router = Router();

router.use("/rename", renameRouter);
router.use("/delete", deleteRouter);
