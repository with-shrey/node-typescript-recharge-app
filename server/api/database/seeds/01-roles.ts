import * as Knex from 'knex';
import RolesMap from '../../../../common/utils/roles';
import LoggerService from '../../utils/logger.service';
import RoleRepository from '../repository/role.repository';

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    const result = new RoleRepository().create(RolesMap);
    LoggerService.info({
        file: 'seed:roles',
        status: result
    });
}
