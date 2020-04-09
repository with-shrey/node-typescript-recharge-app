import * as Knex from 'knex';
import {CommissionPackageTable, UserTable} from '../../utils/table-names';


export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(CommissionPackageTable))) {
        await knex.schema.createTable(CommissionPackageTable, table => {
            table.increments('commissionId').primary();
            table.string('commissionName');
            table.integer('createdBy').unsigned()
                .references('userId').inTable(UserTable).onUpdate('CASCADE').onDelete('CASCADE');
            table.unique(['commissionName', 'createdBy']);
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(CommissionPackageTable);
}

