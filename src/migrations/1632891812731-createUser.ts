import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createUser1632891812731 implements MigrationInterface {


    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "user",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true
                },
                {
                    name: "uuid",
                    type: "uuid",
                    default: "uuid_generate_v4()"
                },
                {
                    name: 'firstName',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'lastName',
                    type: 'varchar',
                    isNullable: false,
                },
                {
                    name: 'password',
                    type: 'varchar',
                    default: null
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()'
                },
                {
                    name: 'deleted_at',
                    type: 'timestamp',
                    default: 'now()'
                }
            ],
            indices: [
                {
                    name: "unique_user_name",
                    columnNames: ['name'],
                    isUnique: true
                }
            ]
        }), true, true, true)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user', true, true, true)
    }

}