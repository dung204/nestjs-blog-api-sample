import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1708328228740 implements MigrationInterface {
    name = 'InitDatabase1708328228740'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "name" character varying(100) NOT NULL, "description" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying(255) NOT NULL, "content" text, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "user_id" uuid, CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying(100) NOT NULL, "password" character varying(100) NOT NULL, "first_name" character varying(64) NOT NULL, "last_name" character varying(64) NOT NULL, "address" character varying(256), "avatar_url" character varying(256), "is_active" boolean NOT NULL DEFAULT 'true', "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "post_tags_tags" ("post_id" uuid NOT NULL, "tags_id" uuid NOT NULL, CONSTRAINT "PK_b830e9d6979698f964550d31c82" PRIMARY KEY ("post_id", "tags_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_9bc3acce79ba3bf0093eaa4496" ON "post_tags_tags" ("post_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_11da0013dc44cfddf87cb859b1" ON "post_tags_tags" ("tags_id") `);
        await queryRunner.query(`ALTER TABLE "post" ADD CONSTRAINT "FK_52378a74ae3724bcab44036645b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "post_tags_tags" ADD CONSTRAINT "FK_9bc3acce79ba3bf0093eaa4496c" FOREIGN KEY ("post_id") REFERENCES "post"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "post_tags_tags" ADD CONSTRAINT "FK_11da0013dc44cfddf87cb859b1e" FOREIGN KEY ("tags_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "post_tags_tags" DROP CONSTRAINT "FK_11da0013dc44cfddf87cb859b1e"`);
        await queryRunner.query(`ALTER TABLE "post_tags_tags" DROP CONSTRAINT "FK_9bc3acce79ba3bf0093eaa4496c"`);
        await queryRunner.query(`ALTER TABLE "post" DROP CONSTRAINT "FK_52378a74ae3724bcab44036645b"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_11da0013dc44cfddf87cb859b1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_9bc3acce79ba3bf0093eaa4496"`);
        await queryRunner.query(`DROP TABLE "post_tags_tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "post"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
