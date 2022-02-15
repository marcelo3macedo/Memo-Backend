import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateFeaturedDecks1631064531216 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'featured_decks',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                },
                {
                  name: 'deckId',
                  type: 'uuid',
                },
                {
                    name: 'typeId',
                    type: 'uuid',
                    isNullable: true,
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'now()',
                  isNullable: true,
                },
                {
                  name: 'deletedAt',
                  type: 'timestamp',
                  isNullable: true,
                },
              ],
            })
          );

          await queryRunner.createForeignKey(
            'featured_decks',
            new TableForeignKey({
              columnNames: ['deckId'],
              referencedTableName: 'decks',
              referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('featured_decks');
    }

}
