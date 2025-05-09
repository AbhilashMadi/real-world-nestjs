import { MigrationInterface, QueryRunner } from "typeorm";

export class IntialMigration1746775976259 implements MigrationInterface {
    name = 'IntialMigration1746775976259'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "tags" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_e7dc17249a1148a1970748eda99" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "slug" character varying NOT NULL, "description" character varying NOT NULL, "body" text NOT NULL, "favorited" boolean NOT NULL DEFAULT false, "favoritesCount" integer NOT NULL DEFAULT '0', "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "authorId" integer, CONSTRAINT "UQ_1123ff6815c5b8fec0ba9fec370" UNIQUE ("slug"), CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "username" character varying NOT NULL, "bio" character varying NOT NULL, "image" character varying NOT NULL, "password" character varying NOT NULL, CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "article_tags" ("article_id" integer NOT NULL, "tag_id" integer NOT NULL, CONSTRAINT "PK_dd79accc42e2f122f6f3ff7588a" PRIMARY KEY ("article_id", "tag_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_f8c9234a4c4cb37806387f0c9e" ON "article_tags" ("article_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_1325dd0b98ee0f8f673db6ce19" ON "article_tags" ("tag_id") `);
        await queryRunner.query(`ALTER TABLE "articles" ADD CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34" FOREIGN KEY ("authorId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "article_tags" ADD CONSTRAINT "FK_f8c9234a4c4cb37806387f0c9e9" FOREIGN KEY ("article_id") REFERENCES "articles"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "article_tags" ADD CONSTRAINT "FK_1325dd0b98ee0f8f673db6ce194" FOREIGN KEY ("tag_id") REFERENCES "tags"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "article_tags" DROP CONSTRAINT "FK_1325dd0b98ee0f8f673db6ce194"`);
        await queryRunner.query(`ALTER TABLE "article_tags" DROP CONSTRAINT "FK_f8c9234a4c4cb37806387f0c9e9"`);
        await queryRunner.query(`ALTER TABLE "articles" DROP CONSTRAINT "FK_65d9ccc1b02f4d904e90bd76a34"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_1325dd0b98ee0f8f673db6ce19"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_f8c9234a4c4cb37806387f0c9e"`);
        await queryRunner.query(`DROP TABLE "article_tags"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "articles"`);
        await queryRunner.query(`DROP TABLE "tags"`);
    }

}
