import {MigrationInterface, QueryRunner} from "typeorm";

export class EnumColumns1588679108769 implements MigrationInterface {
    name = 'EnumColumns1588679108769'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "language"`, undefined);
        await queryRunner.query(`CREATE TYPE "conversation_language_enum" AS ENUM('fr', 'en')`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "language" "conversation_language_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "stage"`, undefined);
        await queryRunner.query(`CREATE TYPE "conversation_stage_enum" AS ENUM('setup', 'support', 'feedback')`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "stage" "conversation_stage_enum" NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "sender"`, undefined);
        await queryRunner.query(`CREATE TYPE "message_sender_enum" AS ENUM('bot', 'user')`, undefined);
        await queryRunner.query(`ALTER TABLE "message" ADD "sender" "message_sender_enum" NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" DROP COLUMN "sender"`, undefined);
        await queryRunner.query(`DROP TYPE "message_sender_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "message" ADD "sender" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "stage"`, undefined);
        await queryRunner.query(`DROP TYPE "conversation_stage_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "stage" character varying NOT NULL`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" DROP COLUMN "language"`, undefined);
        await queryRunner.query(`DROP TYPE "conversation_language_enum"`, undefined);
        await queryRunner.query(`ALTER TABLE "conversation" ADD "language" character varying`, undefined);
    }

}
