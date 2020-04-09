import * as Knex from 'knex';
import {ProviderTable} from '../../utils/table-names';


export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(ProviderTable))) {
        await knex.schema.createTable(ProviderTable, table => {
            table.increments('providerId').primary();
            table.integer('providerType').unsigned();
            table.string('providerName').unique().notNullable();
            table.string('providerCode', 10).notNullable();
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(ProviderTable);
}

