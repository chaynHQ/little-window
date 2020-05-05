import {MigrationInterface, QueryRunner} from "typeorm";

export class MessageStoryblokColumnIsNullable1588677463672 implements MigrationInterface {
    name = 'MessageStoryblokColumnIsNullable1588677463672'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "storyblok_id" DROP NOT NULL`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "message" ALTER COLUMN "storyblok_id" SET NOT NULL`, undefined);
    }

}
