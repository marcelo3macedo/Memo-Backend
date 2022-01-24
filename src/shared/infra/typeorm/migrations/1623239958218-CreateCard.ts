import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCard1623239958218 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'cards',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                },
                {
                  name: 'title',
                  type: 'varchar',
                  isNullable: true,
                },
                {
                  name: 'content',
                  type: 'varchar',
                },
                {
                  name: 'secretContent',
                  type: 'varchar',
                },
                {
                  name: 'deckId',
                  type: 'varchar',
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
            })
          );

      await queryRunner.createForeignKey(
            'cards',
            new TableForeignKey({
              columnNames: ['deckId'],
              referencedTableName: 'decks',
              referencedColumnNames: ['id']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('cards');
    }

}
