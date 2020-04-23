import { TypeOrmModuleOptions } from '@nestjs/typeorm';
const url = require('url');

const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');


export const databaseConfig:TypeOrmModuleOptions = {
      "type": "postgres",
      "host": params.hostname,
      "port": params.port,
      "username": username,
      "password": password,
      "database": params.pathname.split('/')[1],
      "url": process.env.DATABASE_URL,
      "logging": process.env.NODE_ENV === "dev" ? true : false,
      "autoLoadEntities": true,
      "synchronize": false
    };
