import * as Knex from 'knex';
import {OrganisationTable, RoleTable, UserTable} from '../../utils/table-names';

export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(UserTable))) {
        await knex.schema.createTable(UserTable, table => {
            table.increments('userId').primary();
            table.string('name').notNullable();
            table.string('userName', 50).notNullable();
            table.string('phone', 10).notNullable();
            table.string('email', 100).notNullable();
            table.string('password').notNullable();
            table.string('salt').notNullable();
            table.integer('underUserId').unsigned()
                .references('userId').inTable(UserTable).nullable().onUpdate('CASCADE');
            table.integer('organisationId').unsigned()
                .references('orgId').inTable(OrganisationTable).nullable().onUpdate('CASCADE');
            table.integer('roleId').unsigned().notNullable()
                .references('roleId').inTable(RoleTable).nullable().onUpdate('CASCADE');
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(UserTable);
}

