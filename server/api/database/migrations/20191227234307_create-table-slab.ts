import * as Knex from 'knex';
import {SlabTable, UserTable} from '../../utils/table-names';


export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(SlabTable))) {
        await knex.schema.createTable(SlabTable, table => {
            table.increments('slabId').primary();
            table.string('slabName');
            table.integer('createdBy').unsigned()
                .references('userId').inTable(UserTable).onUpdate('CASCADE').onDelete('CASCADE');
            table.unique(['slabName', 'createdBy']);
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(SlabTable);
}

