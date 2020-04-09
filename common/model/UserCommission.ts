import {User} from './User';
import Role from './Role';

export default interface UserCommission {
    userCommissionId?: number;
    userId?: number;
    user?: User;
    roleId?: number;
    role?: Role;
    commissionId?: number;
}
