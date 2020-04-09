import * as Knex from 'knex';
import {OrganisationTable} from '../../utils/table-names';


export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(OrganisationTable))) {
        await knex.schema.createTable(OrganisationTable, function(table) {
            table.increments('orgId').primary();
            table.string('orgName').notNullable().unique();
            table.string('host').notNullable().unique();
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(OrganisationTable);
}

