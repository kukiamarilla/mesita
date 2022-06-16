import 'reflect-metadata';
import { DataSource } from 'typeorm';
import 'dotenv/config'
export const AppDataSource = new DataSource({
  type: process.env.DB_DRIVER,
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: ['./src/models/*.{js,ts}'],
  migrations: ['./src/migrations/*.{js,ts}'],
  subscribers: ['src/subscriber/**/*{.js,.ts}'],
});

AppDataSource.initialize();
