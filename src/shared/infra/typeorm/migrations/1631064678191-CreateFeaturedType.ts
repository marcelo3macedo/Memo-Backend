import {MigrationInterface, QueryRunner, Table, TableForeignKey} from "typeorm";

export class CreateFeaturedType1631064678191 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'featured_type',
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
              columnNames: ['typeId'],
              referencedTableName: 'featured_type',
              referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable('featured_type');
    }
}
