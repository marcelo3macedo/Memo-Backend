import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDeckReviewedAt1641132798809 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("decks", new TableColumn({
            name: "reviewAt",
            type: "timestamp",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("decks", "reviewAt");
    }

}
