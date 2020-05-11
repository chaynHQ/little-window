import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as url from 'url';
import { Message } from '../message/message.entity';
import { Conversation } from '../conversation/conversation.entity';

const params = url.parse(process.env.DATABASE_URL);
const [username, password] = params.auth.split(':');

const databaseConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: params.hostname,
  port: parseInt(params.port),
  username: username,
  password: password,
  database: params.pathname.split('/')[1],
  url: process.env.DATABASE_URL,
  logging: process.env.NODE_ENV === 'dev' ? true : false,
  autoLoadEntities: true,
  synchronize: false,
  cli: {
    migrationsDir: 'src/migration',
  },
  migrations: ['dist/src/migration/*.js'],
  migrationsRun: true,
  entities: [Message, Conversation],
};

module.exports = databaseConfig;
