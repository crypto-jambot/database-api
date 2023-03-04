import { Response } from "express";
import { confirmConnection } from "./mongoConfig";
import { Connection } from "mongoose";
type RequestResponse = {
    responseCode: number;
    data: any;
};
export async function makeRequest(
    res: Response,
    callback: (connection: Connection) => Promise<RequestResponse>
) {
    try {
        const { responseCode, data } = await callback(
            await confirmConnection()
        );
        res.status(responseCode).json({ message: data });
    } catch (err: any) {
        const { name, message } = err;
        res.status(400).json({ errorType: name, message });
    }
}
