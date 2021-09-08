import {MigrationInterface, QueryRunner, Table} from "typeorm";

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
                },
                {
                   name: "active",
                   type: "boolean",
                   default: true,
                },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'now()',
                  isNullable: true,
                },
              ],
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('featured_decks');
    }

}
