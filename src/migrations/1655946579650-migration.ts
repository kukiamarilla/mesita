import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1655946579650 implements MigrationInterface {
  name = 'migration1655946579650';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`consumicion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`creado\` datetime NOT NULL, \`cerrado\` datetime NOT NULL, \`total\` int NOT NULL, \`estado\` varchar(255) NOT NULL, \`clienteId\` int NULL, \`mesaId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`detalle_consumicion\` (\`id\` int NOT NULL AUTO_INCREMENT, \`cantidad\` int NOT NULL, \`productoId\` int NULL, \`consumicionId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`consumicion\` ADD CONSTRAINT \`FK_5885d1ea4d79214758a2d0357ab\` FOREIGN KEY (\`clienteId\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`consumicion\` ADD CONSTRAINT \`FK_cb5b65e0efb12d18b9b979586a1\` FOREIGN KEY (\`mesaId\`) REFERENCES \`mesa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`detalle_consumicion\` ADD CONSTRAINT \`FK_33617897961d3ee1d1cb625186d\` FOREIGN KEY (\`productoId\`) REFERENCES \`producto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`detalle_consumicion\` ADD CONSTRAINT \`FK_8814633ff5e9f6663db134c1f6d\` FOREIGN KEY (\`consumicionId\`) REFERENCES \`consumicion\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`detalle_consumicion\` DROP FOREIGN KEY \`FK_8814633ff5e9f6663db134c1f6d\``
    );
    await queryRunner.query(
      `ALTER TABLE \`detalle_consumicion\` DROP FOREIGN KEY \`FK_33617897961d3ee1d1cb625186d\``
    );
    await queryRunner.query(
      `ALTER TABLE \`consumicion\` DROP FOREIGN KEY \`FK_cb5b65e0efb12d18b9b979586a1\``
    );
    await queryRunner.query(
      `ALTER TABLE \`consumicion\` DROP FOREIGN KEY \`FK_5885d1ea4d79214758a2d0357ab\``
    );
    await queryRunner.query(`DROP TABLE \`detalle_consumicion\``);
    await queryRunner.query(`DROP TABLE \`consumicion\``);
  }
}
