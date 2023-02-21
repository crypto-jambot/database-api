import { Response } from "express";
type RequestResponse = {
    responseCode: number;
    data: any;
};
export async function makeRequest(
    res: Response,
    callback: () => Promise<RequestResponse>
) {
    try {
        const { responseCode, data } = await callback();
        res.status(responseCode).json({ message: data });
    } catch (err: any) {
        const { name, message } = err;
        res.status(400).json({ errorType: name, message });
    }
}
