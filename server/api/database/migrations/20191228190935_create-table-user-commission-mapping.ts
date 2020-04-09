import * as Knex from 'knex';
import {CommissionPackageTable, RoleTable, UserCommissionMappingTable, UserTable} from '../../utils/table-names';


export async function up(knex: Knex): Promise<any> {
    if (!(await knex.schema.hasTable(UserCommissionMappingTable))) {
        await knex.schema.createTable(UserCommissionMappingTable, table => {
            table.increments('userCommissionId').primary();
            table.integer('userId').unsigned().notNullable()
                .references('userId').inTable(UserTable).onUpdate('CASCADE').onDelete('CASCADE');
            table.integer('roleId').unsigned().notNullable()
                .references('roleId').inTable(RoleTable).onUpdate('CASCADE').onDelete('RESTRICT');
            table.integer('commissionId').unsigned().notNullable()
                .references('commissionId').inTable(CommissionPackageTable).onUpdate('CASCADE').onDelete('RESTRICT');
            table.unique(['userId', 'roleId']);
            table.timestamps(true, true);
        });
    }
}


export async function down(knex: Knex): Promise<any> {
    await knex.schema.dropTable(UserCommissionMappingTable);
}

