import { connect } from "mongoose";
import { SecretUtil } from "@crypto-jambot/secret-manager-utils";
import { Storage } from "@google-cloud/storage";

const util = new SecretUtil();
export const storage = new Storage();
util.getSecretString(process.env.SECRET as string)
    .then((value) => {
        connect(
            `mongodb+srv://${process.env.DB_USER}:${value}@${process.env.CLUSTER_URL}/${process.env.DATABASE}?retryWrites=true&w=majority`,
            {
                authSource: "admin",
            }
        )
            .then(() => {
                console.log("Connected");
            })
            .catch((err) => console.error(err));
    })
    .catch((err) => {
        console.log(err);
    });
