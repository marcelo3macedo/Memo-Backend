import {MigrationInterface, QueryRunner,  Table} from "typeorm";

export class CreateDeck1619101195072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'decks',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'userId',
                  type: 'uuid',
                },
                {
                  name: 'imageId',
                  type: 'integer',
                  isNullable: true,
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
        await queryRunner.dropTable('decks');
    }

}
