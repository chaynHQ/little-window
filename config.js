require("env2")("config.env");

const DF_KEY = process.env.DF_KEY;

let DATABASE_URL = process.env.DATABASE_URL;
if (process.env.NODE_ENV === "test") {
  DATABASE_URL = process.env.TEST_DB_URL_URL;
}

// if (!DATABASE_URL)
//   throw new Error("Environment variable DATABASE_URL must be set");

module.exports = { DATABASE_URL, DF_KEY };
