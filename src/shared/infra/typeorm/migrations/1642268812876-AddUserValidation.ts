import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddUserValidation1642268812876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn("users", new TableColumn({
            name: "authToken",
            type: "varchar",
            isNullable: true
        }));

        await queryRunner.addColumn("users", new TableColumn({
            name: "validated",
            type: "boolean",
            default: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn("users", "authToken");
        await queryRunner.dropColumn("users", "validated");
    }

}
