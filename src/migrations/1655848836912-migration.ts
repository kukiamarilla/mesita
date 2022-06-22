import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1655848836912 implements MigrationInterface {
  name = 'migration1655848836912';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "categoria" ("id" SERIAL NOT NULL, "nombre" character varying NOT NULL, CONSTRAINT "PK_f027836b77b84fb4c3a374dc70d" PRIMARY KEY ("id"))`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "categoria"`);
  }
}
