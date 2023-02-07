import { Router } from "express";
import { verify } from "jsonwebtoken";
import { SecretUtil } from "@crypto-jambot/secret-manager-utils";
import { mongoRoute } from "./mongo";

export const router = Router();
const secretUtil = new SecretUtil();

router.use("/", async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.split(" ")[1];
    if (!!token) {
        try {
            const publicKey: string = await secretUtil.getSecretString(
                "besu-public-key"
            );
            verify(token, publicKey);
            next();
        } catch (err: any) {
            const { message } = err;
            res.status(401).json({
                message: message ?? "Failure to Authenticate",
            });
        }
        return;
    }
    res.status(400).json({
        message: "Missing Authorization Header or it is formatted incorrectly",
    });
});

router.use("/publish", mongoRoute);
