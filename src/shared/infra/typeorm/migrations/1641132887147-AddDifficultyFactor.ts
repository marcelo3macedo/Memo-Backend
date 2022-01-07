import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDifficultyFactor1641132887147 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("difficulty", new TableColumn({
            name: "factor",
            type: "integer",
            default: 0
        }));
        
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("difficulty", "factor");
    }

}
