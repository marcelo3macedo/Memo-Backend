import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddParamsMailScheduler1642287949863 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("mail_scheduler", new TableColumn({
            name: "destinationName",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("mail_scheduler", new TableColumn({
            name: "params",
            type: "varchar",
            isNullable: true
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("mail_scheduler", "destinationName");
        await queryRunner.dropColumn("mail_scheduler", "params");
    }

}
