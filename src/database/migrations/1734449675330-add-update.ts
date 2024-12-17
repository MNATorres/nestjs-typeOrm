import {MigrationInterface, QueryRunner} from "typeorm";

export class addUpdate1734449675330 implements MigrationInterface {
    name = 'addUpdate1734449675330'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "product" ADD "updateAt" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`COMMENT ON COLUMN "product"."createAt" IS NULL`);
        await queryRunner.query(`ALTER TABLE "product" DROP COLUMN "updateAt"`);
    }

}
