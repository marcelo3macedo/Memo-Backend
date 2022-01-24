import {MigrationInterface, QueryRunner,  Table, TableForeignKey} from "typeorm";

export class CreateDeck1619101195072 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'decks',
              columns: [
                {
                  name: 'id',
                  type: 'char',
                  length: '64',
                  isPrimary: true,
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'userId',
                  type: 'char',
                  length: '64',
                },
                {
                  name: 'isPublic',
                  type: 'boolean',
                  default: false,
                },
                {
                  name: 'parentId',
                  type: 'char',
                  length: '64',
                  isNullable: true,
                },
                {
                  name: 'clonedBy',
                  type: 'varchar',
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
