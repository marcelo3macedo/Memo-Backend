import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class AddFrequencyToDecks1640523830107 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("decks", new TableColumn({
            name: "frequencyId",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.createForeignKey(
            'decks',
            new TableForeignKey({
              columnNames: ['frequencyId'],
              referencedTableName: 'frequencies',
              referencedColumnNames: ['id']
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("decks", "frequencyId");
    }

}
