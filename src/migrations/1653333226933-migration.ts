import { MigrationInterface, QueryRunner } from 'typeorm';

export class migration1653333226933 implements MigrationInterface {
  name = 'migration1653333226933';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE \`horario\` (\`id\` int NOT NULL AUTO_INCREMENT, \`horaInicio\` varchar(255) NOT NULL, \`horaFin\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `CREATE TABLE \`reserva\` (\`id\` int NOT NULL AUTO_INCREMENT, \`fecha\` datetime NOT NULL, \`restauranteId\` int NULL, \`mesaId\` int NULL, \`horarioId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`
    );
    await queryRunner.query(
      `ALTER TABLE \`reserva\` ADD CONSTRAINT \`FK_563b8a3ca19d313a83587851646\` FOREIGN KEY (\`restauranteId\`) REFERENCES \`restaurante\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`reserva\` ADD CONSTRAINT \`FK_100077ca3abc25013915c821dee\` FOREIGN KEY (\`mesaId\`) REFERENCES \`mesa\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query(
      `ALTER TABLE \`reserva\` ADD CONSTRAINT \`FK_52e3a924a79a797295c3eae53ef\` FOREIGN KEY (\`horarioId\`) REFERENCES \`horario\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`reserva\` DROP FOREIGN KEY \`FK_52e3a924a79a797295c3eae53ef\``
    );
    await queryRunner.query(
      `ALTER TABLE \`reserva\` DROP FOREIGN KEY \`FK_100077ca3abc25013915c821dee\``
    );
    await queryRunner.query(
      `ALTER TABLE \`reserva\` DROP FOREIGN KEY \`FK_563b8a3ca19d313a83587851646\``
    );
    await queryRunner.query(`DROP TABLE \`reserva\``);
    await queryRunner.query(`DROP TABLE \`horario\``);
  }
}
