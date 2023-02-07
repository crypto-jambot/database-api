import { connect } from "mongoose";
import { Storage } from "@google-cloud/storage";

connect(process.env.URL as string, {
    authSource: "admin",
})
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => console.error(err));

export const storage = new Storage();
