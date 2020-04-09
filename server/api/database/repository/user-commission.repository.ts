import {BaseRepository} from './base/base.repository';
import UserCommission from '../../../../common/model/UserCommission';
import {RoleTable, UserCommissionMappingTable} from '../../utils/table-names';
import {User} from '../../../../common/model/User';
import knex from '../knex';

export default class UserCommissionRepository extends BaseRepository<UserCommission> {
    constructor() {
        super(UserCommissionMappingTable);
    }

    async findWithRole(userFields: User): Promise<any | null> {
        try {
            const commissionRoleJoinBuilder = knex(UserCommissionMappingTable)
                .select('*');
            Object.keys(userFields).forEach(key => {
                commissionRoleJoinBuilder.where(`${UserCommissionMappingTable}.${key}`, userFields[key]);
            });
            commissionRoleJoinBuilder
                .join(RoleTable, `${UserCommissionMappingTable}.roleId`, `${RoleTable}.roleId`);

            return await commissionRoleJoinBuilder;
        } catch (e) {
            this.logger.error({
                file: 'UserCommissionRepositiory',
                function: 'findWithRole',
                e
            });
            return null;
        }
    }
}
