import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUser1619111145001 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
               name: "users",
               columns: [
                  {
                     name: "id",
                     type: 'char',
                     length: '64',
                     isPrimary: true,
                  },
                  {
                     name: "name",
                     type: "varchar",
                  },
                  {
                     name: "password",
                     type: "varchar",
                  },
                  {
                     name: "email",
                     type: "varchar",
                  },
                  {
                     name: "isAdmin",
                     type: "boolean",
                     default: false,
                  },
                  {
                     name: "createdAt",
                     type: "timestamp",
                     default: "now()",
                  },
               ],
            })
         );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
