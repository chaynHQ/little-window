require("env2")("config.env");

const DF_KEY = process.env.DF_KEY;
const GOOGLE_API_1 = process.env.GOOGLE_API_1
const GOOGLE_API_2 = process.env.GOOGLE_API_2

let DATABASE_URL = process.env.DATABASE_URL;
if (process.env.NODE_ENV === "test") {
  DATABASE_URL = process.env.HEROKU_POSTGRESQL_OLIVE_URL;
}

if (!DATABASE_URL) throw new Error("Environment variable DATABASE_URL must be set");

module.exports = { DATABASE_URL, DF_KEY, GOOGLE_API_1, GOOGLE_API_2 };
