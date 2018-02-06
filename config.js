require("env2")("config.env");

const DF_KEY = process.env.DF_KEY;
const HOST = process.env.HOST
const DB_PORT = process.env.DB_PORT
const USERNAME = process.env.USERNAME
const PASSWORD = process.env.PASSWORD
const DBNAME = process.env.DBNAME
const GOOGLE_API_1 = process.env.GOOGLE_API_1
const GOOGLE_API_2 = process.env.GOOGLE_API_2

let DATABASE_URL = process.env.DATABASE_URL;
// if (process.env.NODE_ENV === "test") {
//   DATABASE_URL = process.env.TEST_DB_URL_URL;
// }

// if (!DATABASE_URL)
//   throw new Error("Environment variable DATABASE_URL must be set");

module.exports = { DATABASE_URL, DF_KEY, HOST, DB_PORT, USERNAME, PASSWORD, DBNAME, GOOGLE_API_1, GOOGLE_API_2 };
