import 'reflect-metadata';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'mesita',
  password: 'mesita',
  database: 'mesita',
  synchronize: true,
  logging: false,
  entities: ['./src/models/*.{js,ts}'],
  migrations: ['./src/migrations/*.{js,ts}'],
  subscribers: [],
});

AppDataSource.initialize();
