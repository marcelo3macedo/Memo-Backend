import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddOptionsFrequency1641317755005 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("frequencies", new TableColumn({
            name: "interval",
            type: "timestamp",
            isNullable: true
        }));

        await queryRunner.addColumn("frequencies", new TableColumn({
            name: "period",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("frequencies", new TableColumn({
            name: "maxSessions",
            type: "integer",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("frequencies", "interval");
        await queryRunner.dropColumn("frequencies", "period");
        await queryRunner.dropColumn("frequencies", "maxSessions");
    }

}
