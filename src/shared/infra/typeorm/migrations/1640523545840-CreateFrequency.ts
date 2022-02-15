import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateFrequency1640523545840 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'frequencies',
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
                  name: 'default',
                  type: 'boolean',
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
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('frequencies');
    }

}
