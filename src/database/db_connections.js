const pgp = require('pg-promise')();
const url = require('url');
const { DATABASE_URL, HOST, PORT, USERNAME, PASSWORD, DBNAME } = require('../../config');

const options = {
    host: HOST,
    port: PORT,
    database: DBNAME,
    max: process.env.DB_MAX_CONNECTIONS || 2,
    user: USERNAME,
    password: PASSWORD,
    ssl: HOST !== 'localhost'
};

module.exports = pgp(options);