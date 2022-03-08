import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddDeckPath1646744167276 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("decks", new TableColumn({
            name: "path",
            type: 'varchar',
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("decks", "path");
    }

}
