import * as Knex from 'knex';
import {RoleTable} from '../../utils/table-names';


export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(RoleTable))) {
        await knex.schema.createTable(RoleTable, table => {
            table.increments('roleId').primary();
            table.string('roleName').notNullable().unique();
            table.integer('priority').notNullable();
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(RoleTable);
}

