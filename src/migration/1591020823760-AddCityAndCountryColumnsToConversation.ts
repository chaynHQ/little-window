import {MigrationInterface, QueryRunner} from "typeorm";

export class AddCityAndCountryColumnsToConversation1591020823760 implements MigrationInterface {
    name = 'AddCityAndCountryColumnsToConversation1591020823760'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" ADD "city" character varying`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "country" character varying`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "country"`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "city"`, undefined);
    }

}
