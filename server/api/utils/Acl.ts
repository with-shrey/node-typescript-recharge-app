import rules, {Resources} from '../../../common/acl/rules';
import UserCommissionRepository from '../database/repository/user-commission.repository';
import {User} from '../../../common/model/User';
import {RolesMap} from '../../../common/utils/roles';

export default class Acl {

    constructor(private resource: string, private user: User) {
    }

    hasAccessTo(property: string) {
        const userRules = rules[this.user.role.roleName];
        if (!userRules) {
            return false;
        }
        const resourceRules: any[] = userRules[this.resource];
        if (!resourceRules) {
            return false;
        }
        return resourceRules.includes(property);
    }

    async asyncHasAccessTo(property?: string, data?: any): Promise<boolean> {
        if (this.resource === Resources.Commission || this.resource === Resources.Slab) {
            const commissionMap = await new UserCommissionRepository().findWithRole({
                userId: this.user.userId,
            });
            return this.user.role.roleName === RolesMap.ADMIN || commissionMap
                .some((mapping) => mapping.priority > this.user.role.priority);
        } else if (this.resource === Resources.User) {
            return this.user.role.priority < data; // data = priority
        }
        return false;
    }

}
