import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1653941099519 implements MigrationInterface {
    name = 'migration1653941099519'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reserva\` ADD \`clienteId\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`reserva\` ADD CONSTRAINT \`FK_763258e90dbeb22901a3efdc09f\` FOREIGN KEY (\`clienteId\`) REFERENCES \`cliente\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`reserva\` DROP FOREIGN KEY \`FK_763258e90dbeb22901a3efdc09f\``);
        await queryRunner.query(`ALTER TABLE \`reserva\` DROP COLUMN \`clienteId\``);
    }

}
