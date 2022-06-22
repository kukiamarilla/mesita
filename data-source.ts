import 'reflect-metadata';
import { DataSource, DataSourceOptions } from 'typeorm';
import 'dotenv/config';

export const AppDataSource = new DataSource({
  type: process.env.DB_DRIVER,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['./src/models/*.{js,ts}'],
  migrations: ['./src/migrations/*.{js,ts}'],
  subscribers: ['src/subscriber/*/{.js,.ts}'],
} as DataSourceOptions);

AppDataSource.initialize();