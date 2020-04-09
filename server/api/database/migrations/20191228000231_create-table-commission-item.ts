import * as Knex from 'knex';
import {CommissionItemTable, CommissionPackageTable, ProviderTable, SlabTable} from '../../utils/table-names';

export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(CommissionItemTable))) {
        await knex.schema.createTable(CommissionItemTable, table => {
            table.increments('commissionItemId').primary();
            table.integer('commissionId').unsigned().notNullable()
                .references('commissionId').inTable(CommissionPackageTable).onUpdate('CASCADE').onDelete('CASCADE');
            table.integer('providerId').unsigned().notNullable()
                .references('providerId').inTable(ProviderTable).onUpdate('CASCADE').onDelete('RESTRICT');
            table.integer('commission').defaultTo(0);
            table.boolean('isPercent').defaultTo(false);
            table.integer('slabId').unsigned().nullable()
                .references('slabId').inTable(SlabTable).onUpdate('CASCADE').onDelete('RESTRICT').nullable();
            table.unique(['commissionId', 'providerId']);
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(CommissionItemTable);
}

