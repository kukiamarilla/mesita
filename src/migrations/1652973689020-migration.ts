import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1652973689020 implements MigrationInterface {
  name = 'migration1652973689020';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`cliente\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cedula\` varchar(255) NOT NULL, \`nombre\` varchar(255) NOT NULL, \`apellido\` varchar(255) NOT NULL, UNIQUE INDEX \`IDX_746b02865d530423b3d06aecfd\` (\`cedula\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `DROP INDEX \`IDX_746b02865d530423b3d06aecfd\` ON \`cliente\``
    );
    await queryRunner.query(`DROP TABLE \`cliente\``);
  }
}
