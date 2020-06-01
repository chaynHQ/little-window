import {MigrationInterface, QueryRunner} from "typeorm";

export class AddLocationColumnToConversation1591006333723 implements MigrationInterface {
    name = 'AddLocationColumnToConversation1591006333723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" RENAME COLUMN "city" TO "location"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" RENAME COLUMN "location" TO "city"`, undefined);
    }

}
