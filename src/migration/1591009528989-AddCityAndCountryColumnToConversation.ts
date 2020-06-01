import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCityAndCountryColumnToConversation1591009528989 implements MigrationInterface {
    name = 'AddCityAndCountryColumnToConversation1591009528989'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "location"`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "city" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "country" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "country"`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "city"`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "location" character varying`, undefined);
    }

}
