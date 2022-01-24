import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCategoryDecks1634567817285 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'categories_decks',
            columns: [
                {
                     name: 'categoryId',
                     type: 'char',
                     length: '64',
                     isPrimary: true,
                },
                {
                     name: 'deckId',
                     type: 'char',
                     length: '64',
                     isPrimary: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: true,
                },
                {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['categoryId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'categories',
                },
                {
                    columnNames: ['deckId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'decks',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories_decks');
    }

}
