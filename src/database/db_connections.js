const pgp = require('pg-promise')();
const url = require('url');
const { DATABASE_URL } = require('../../config');

const params = url.parse(DATABASE_URL);
const [username, password] = params.auth.split(':');

const options = {
  host: params.hostname,
  port: params.port,
  database: params.pathname.split('/')[1],
  max: process.env.DB_MAX_CONNECTIONS || 2,
  user: username,
  password,
  ssl: params.hostname !== 'localhost',
};

module.exports = pgp(options);
