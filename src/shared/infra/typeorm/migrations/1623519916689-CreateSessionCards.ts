import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateSessionCards1623519916689 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'sessions_cards_cards',
            columns: [
                {
                     name: 'sessionsId',
                     type: 'uuid',
                     isPrimary: true,
                },
                {
                     name: 'cardsId',
                     type: 'uuid',
                     isPrimary: true,
                },
                {
                     name: 'difficultyId',
                     type: 'uuid',
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
