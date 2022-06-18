import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1652935661437 implements MigrationInterface {
  name = 'migration1652935661437';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`restaurante\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`direccion\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`mesa\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`x\` int NOT NULL, \`y\` int NOT NULL, \`piso\` int NOT NULL DEFAULT '1', \`capacidad\` int NOT NULL, \`restauranteId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`mesa\` ADD CONSTRAINT \`FK_058940bd0793556ebda71539bb3\` FOREIGN KEY (\`restauranteId\`) REFERENCES \`restaurante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`mesa\` DROP FOREIGN KEY \`FK_058940bd0793556ebda71539bb3\``
    );
    await queryRunner.query(`DROP TABLE \`mesa\``);
    await queryRunner.query(`DROP TABLE \`restaurante\``);
  }
}
