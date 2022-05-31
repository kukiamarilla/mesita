import { MigrationInterface, QueryRunner } from 'typeorm';
import { AppDataSource } from '../../data-source';
import { HorarioSeeder } from '../seeders/HorarioSeeder';
import { Horario } from '../models/horario';

export class SeedHorarios1653942173724 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await AppDataSource.getRepository(Horario).save(HorarioSeeder);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {}
}
