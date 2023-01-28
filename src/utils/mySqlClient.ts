import { createConnection } from "mysql";
import * as process from "process";
const host = process.env.HOST;
const user = process.env.USER_NAME;
const password = process.env.PASSWORD;

export const client = createConnection({
    host,
    user,
    password,
    insecureAuth: true,
});
