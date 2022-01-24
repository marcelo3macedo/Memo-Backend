import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCategory1634567540211 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'categories',
              columns: [
                {
                  name: 'id',
                  type: 'varchar',
                  isPrimary: true,
                },
                {
                  name: 'name',
                  type: 'varchar',
                },
                {
                  name: 'parentId',
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
                  name: "deletedAt",
                  type: "timestamp",
                  isNullable: true,
                },
              ],
            })
          );  
          
        await queryRunner.createForeignKey(
            'categories',
            new TableForeignKey({
              columnNames: ['parentId'],
              referencedTableName: 'categories',
              referencedColumnNames: ['id']
            })
          );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('categories');
    }

}
