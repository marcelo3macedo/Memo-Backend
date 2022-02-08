import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddThemeDecks1643978336175 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("decks", new TableColumn({
            name: "themeId",
            type: 'char',
            length: '64',
            isNullable: true
        }));

        await queryRunner.createForeignKey(
            'decks',
            new TableForeignKey({
              columnNames: ['themeId'],
              referencedTableName: 'themes',
              referencedColumnNames: ['id']
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("decks", "themeId");
    }
}
