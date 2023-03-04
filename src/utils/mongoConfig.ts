import { connect, Connection, connection } from "mongoose";
import { SecretUtil } from "@crypto-jambot/secret-manager-utils";

const util = new SecretUtil();

export function confirmConnection() {
    return new Promise<Connection>(async (resolve, reject) => {
        try {
            let mongoConnection = await connection;
            if (mongoConnection.readyState === 0) {
                mongoConnection = await connectDatabase();
            }
            resolve(mongoConnection);
        } catch (err) {
            reject(err);
        }
    });
}

function connectDatabase() {
    return new Promise<Connection>(async (resolve, reject) => {
        try {
            const password = await util.getSecretString(
                process.env.SECRET as string
            );
            const { connection: newConnection } = await connect(
                `mongodb+srv://${process.env.DB_USER}:${password}@${process.env.CLUSTER_URL}/${process.env.DATABASE}?retryWrites=true&w=majority`
            );
            resolve(newConnection);
        } catch (err) {
            reject(err);
        }
    });
}
