import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateThemes1643977004997 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'themes',
                columns: [
                    {
                        name: 'id',
                        type: 'char',
                        length: '64',
                        isPrimary: true,
                    },
                    {
                        name: 'src',
                        type: 'varchar',
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
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('themes');
    }

}
