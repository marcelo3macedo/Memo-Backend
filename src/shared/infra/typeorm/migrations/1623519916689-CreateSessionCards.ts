import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSessionCards1623519916689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sessions_cards_cards',
            columns: [
                {
                     name: 'sessionsId',
                     type: 'char',
                     length: '64',
                     isPrimary: true,
                },
                {
                     name: 'cardsId',
                     type: 'char',
                     length: '64',
                     isPrimary: true,
                },
                {
                     name: 'difficultyId',
                     type: 'char',
                     length: '64',
                     isNullable: true,
                },
                {
                    name: 'createdAt',
                    type: 'timestamp',
                    default: 'now()',
                    isNullable: true,
                },
                {
                    name: 'answeredAt',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'deletedAt',
                    type: 'timestamp',
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['sessionsId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'sessions',
                },
                {
                    columnNames: ['cardsId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'cards',
                },
                {
                    columnNames: ['difficultyId'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'difficulty',
                },
            ],
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('sessions_cards_cards');
    }

}
