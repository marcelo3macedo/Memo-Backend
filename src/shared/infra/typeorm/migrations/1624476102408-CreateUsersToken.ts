import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUsersToken1624476102408 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
              name: 'users_tokens',
              columns: [
                {
                  name: 'id',
                  type: 'uuid',
                  isPrimary: true,
                },
                {
                  name: 'refreshToken',
                  type: 'varchar',
                },
                {
                   name: "userId",
                   type: "uuid",
                },
                {
                    name: 'expiresDate',
                    type: 'timestamp',
                    isNullable: true,
                  },
                {
                  name: 'createdAt',
                  type: 'timestamp',
                  default: 'now()',
                  isNullable: true,
                },
              ],
              foreignKeys: [
                {
                    columnNames: ['userId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'users',
                    onDelete: 'CASCADE',
                    onUpdate: 'CASCADE',
                }
              ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('users_tokens');
    }

}
