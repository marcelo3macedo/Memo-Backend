import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateCategory1634567540211 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'categories',
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
