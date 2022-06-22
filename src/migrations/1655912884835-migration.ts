import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1655912884835 implements MigrationInterface {
  name = 'migration1655912884835';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`categoria\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`producto\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nombre\` varchar(255) NOT NULL, \`categoriaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`producto\` ADD CONSTRAINT \`FK_6465b0476dcfd393c4808d53b95\` FOREIGN KEY (\`categoriaId\`) REFERENCES \`categoria\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`producto\` DROP FOREIGN KEY \`FK_6465b0476dcfd393c4808d53b95\``
    );
    await queryRunner.query(`DROP TABLE \`producto\``);
    await queryRunner.query(`DROP TABLE \`categoria\``);
  }
}
