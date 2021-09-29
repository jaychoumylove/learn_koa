import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class createPost1632829537203 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query('create table if not exists "user"\n' +
            '(\n' +
            '    id          serial                               not null\n' +
            '        constraint "PK_cace4a159ff9f2512dd42373760"\n' +
            '            primary key,\n' +
            '    "firstName" varchar                              not null,\n' +
            '    "lastName"  varchar                              not null,\n' +
            '    uuid        uuid      default uuid_generate_v4() not null,\n' +
            '    password    varchar,\n' +
            '    created_at  timestamp default now()              not null,\n' +
            '    updated_at  timestamp default now()              not null,\n' +
            '    deleted_at  timestamp\n' +
            ');\n' +
            '\n' +
            'alter table "user"\n' +
            '    owner to postgres;\n' +
            '\n');
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user')
    }
}
