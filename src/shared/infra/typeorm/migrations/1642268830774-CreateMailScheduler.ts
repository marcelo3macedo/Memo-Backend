import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateMailScheduler1642268830774 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "mail_scheduler",
               columns: [
                  {
                     name: "id",
                     type: "varchar",
                     isPrimary: true,
                  },
                  {
                     name: "type",
                     type: "varchar",
                  },
                  {
                     name: "destination",
                     type: "varchar",
                  },
                  {
                     name: "createdAt",
                     type: "timestamp",
                     default: "now()",
                  },
                  {
                    name: "deletedAt",
                    type: "timestamp",
                    isNullable: true
                 }
               ],
            })
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("mail_scheduler");
    }

}
