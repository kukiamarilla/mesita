import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1655921489490 implements MigrationInterface {
    name = 'migration1655921489490'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`producto\` ADD \`precio\` int NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`producto\` DROP COLUMN \`precio\``);
    }

}
