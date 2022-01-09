import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddCategoryToDecks1641572941464 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("decks", new TableColumn({
            name: "categoryId",
            type: "uuid",
            isNullable: true
        }));

        await queryRunner.createForeignKey(
            'decks',
            new TableForeignKey({
              columnNames: ['categoryId'],
              referencedTableName: 'categories',
              referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("decks", "categoryId");
    }

}
