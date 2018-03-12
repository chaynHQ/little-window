const path = require('path');
const { QueryFile } = require('pg-promise');
const db = require('./db_connections');

const sql = file => QueryFile(path.join(__dirname, file), { minify: true });

const build = sql('./db_build.sql');

const runDbBuild = (callback) => {
  db
    .query(build)
    .then(() => {
      callback(null);
    })
    .catch((err) => {
      console.error('error db_build.js', err);
      callback(err);
    });
};

module.exports = runDbBuild;
