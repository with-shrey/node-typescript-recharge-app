import * as Knex from 'knex';
import {SlabItemTable, SlabTable} from '../../utils/table-names';


export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(SlabItemTable))) {
        await knex.schema.createTable(SlabItemTable, table => {
            table.increments('slabItemId').primary();
            table.integer('slabId').unsigned().notNullable().references('slabId').inTable(SlabTable).onUpdate('CASCADE').onDelete('CASCADE');
            table.integer('min');
            table.integer('max');
            table.integer('commission').defaultTo(0);
            table.boolean('commissionIsPercent').defaultTo(true);
            table.integer('surcharge').defaultTo(0);
            table.boolean('surchargeIsPercent').defaultTo(true);
            table.integer('tds').defaultTo(0);
            table.integer('gst').defaultTo(0);
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(SlabItemTable);
}

