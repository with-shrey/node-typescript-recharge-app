import * as Knex from 'knex';
import {UserDetailsTable, UserTable} from '../../utils/table-names';


export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(UserDetailsTable))) {
        await knex.schema.createTable(UserDetailsTable, table => {
            table.increments('userDetailsId').primary();
            table.string('outletName', 100).notNullable();
            table.integer('aadhaar', 16).nullable();
            table.string('gstin', 15).nullable();
            table.text('address').nullable();
            table.integer('pincode', 10).nullable();
            table.string('alternateNumber', 10).nullable();
            table.string('pan', 10).nullable();
            table.integer('userId').unsigned().notNullable().unique()
                .references('userId').inTable(UserTable).onUpdate('CASCADE').onDelete('CASCADE');

        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(UserDetailsTable);
}

