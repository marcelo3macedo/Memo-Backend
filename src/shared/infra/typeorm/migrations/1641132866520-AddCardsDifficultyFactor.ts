import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddCardsDifficultyFactor1641132866520 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("cards", new TableColumn({
            name: "difficultyFactor",
            type: "integer",
            default: 0
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("cards", "difficultyFactor");
    }

}
