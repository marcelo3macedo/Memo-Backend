import {MigrationInterface, QueryRunner,  Table, TableForeignKey} from "typeorm";

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
                  name: 'parentId',
                  type: 'uuid',
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
          
        await queryRunner.createForeignKey(
          'decks',
          new TableForeignKey({
            columnNames: ['parentId'],
            referencedTableName: 'decks',
            referencedColumnNames: ['id']
          })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('decks');
    }

}
