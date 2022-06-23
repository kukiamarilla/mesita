import { MigrationInterface, QueryRunner } from "typeorm";

export class migration1655946975889 implements MigrationInterface {
    name = 'migration1655946975889'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumicion\` CHANGE \`cerrado\` \`cerrado\` datetime NULL`);
        await queryRunner.query(`ALTER TABLE \`consumicion\` CHANGE \`total\` \`total\` int NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`consumicion\` CHANGE \`total\` \`total\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`consumicion\` CHANGE \`cerrado\` \`cerrado\` datetime NOT NULL`);
    }

}
