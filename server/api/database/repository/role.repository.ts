import {BaseRepository} from './base/base.repository';
import {RoleTable} from '../../utils/table-names';
import Role from '../../../../common/model/Role';
import knex from '../knex';
import DatabaseError from '../../utils/errors/DatabaseError';

export default class RoleRepository extends BaseRepository<Role> {
    constructor() {
        super(RoleTable);
    }


    async findOneByName(role: string): Promise<Role | null> {
        try {
            return await knex(RoleTable)
                .where({roleName: role} as Role).first();
        } catch (e) {
            throw new DatabaseError(e.message, 'RoleRepo:findOneByName', {role});
        }
    }
}
