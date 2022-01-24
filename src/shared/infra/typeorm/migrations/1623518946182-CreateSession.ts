import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateSession1623518946182 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'sessions',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                },
                {
                  name: 'userId',
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
                    name: 'finishedAt',
                    type: 'timestamp',
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
            'sessions',
            new TableForeignKey({
              columnNames: ['deckId'],
              referencedTableName: 'decks',
              referencedColumnNames: ['id']
            })
          );

        await queryRunner.createForeignKey(
            'sessions',
            new TableForeignKey({
              columnNames: ['userId'],
              referencedTableName: 'users',
              referencedColumnNames: ['id']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sessions');
    }

}
