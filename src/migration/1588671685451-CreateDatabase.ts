import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreateDatabase1588671685451 implements MigrationInterface {
  name = 'CreateDatabase1588671685451';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "conversation" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "gdpr" boolean, "language" character varying, "stage" character varying NOT NULL, "time_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, CONSTRAINT "PK_864528ec4274360a40f66c29845" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `CREATE TABLE "message" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "message" character varying NOT NULL, "sender" character varying NOT NULL, "storyblok_id" character varying NOT NULL, "time_created" TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP, "conversation_id" uuid, "previousmessage_id" uuid, CONSTRAINT "REL_bb523e5f8b9926c76fe33ba6f6" UNIQUE ("previousmessage_id"), CONSTRAINT "CHK_cb06319148c832b31e68eb8f86" CHECK (NOT (sender = 'bot' AND storyblok_id IS NULL)), CONSTRAINT "PK_ba01f0a3e0123651915008bc578" PRIMARY KEY ("id"))`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_7fe3e887d78498d9c9813375ce2" FOREIGN KEY ("conversation_id") REFERENCES "conversation"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" ADD CONSTRAINT "FK_bb523e5f8b9926c76fe33ba6f68" FOREIGN KEY ("previousmessage_id") REFERENCES "message"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
      undefined,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_bb523e5f8b9926c76fe33ba6f68"`,
      undefined,
    );
    await queryRunner.query(
      `ALTER TABLE "message" DROP CONSTRAINT "FK_7fe3e887d78498d9c9813375ce2"`,
      undefined,
    );
    await queryRunner.query(`DROP TABLE "message"`, undefined);
    await queryRunner.query(`DROP TABLE "conversation"`, undefined);
  }
}
