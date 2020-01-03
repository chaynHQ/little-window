require('dotenv').config();

const {
  DF_KEY,
  GOOGLE_API_1,
  GOOGLE_API_2,
  EMAIL_PASSWORD,
  EMAIL_ACCOUNT,
  EMAIL_TO,
  TRAVIS,
} = process.env;

let { DATABASE_URL } = process.env;

if (process.env.NODE_ENV === 'test') {
  DATABASE_URL = process.env.DATABASE_URL_TEST;
}

if (!DATABASE_URL) {
  throw new Error('Environment variable DATABASE_URL must be set');
}

module.exports = {
  DATABASE_URL,
  DF_KEY,
  GOOGLE_API_1,
  GOOGLE_API_2,
  EMAIL_PASSWORD,
  EMAIL_ACCOUNT,
  EMAIL_TO,
  TRAVIS,
};
