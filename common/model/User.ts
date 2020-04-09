import Organisation from './Organisation';
import Role from './Role';
import UserDetails from './UserDetails';
import UserCommission from './UserCommission';

export interface User {
    salt?: string;
    password?: string;
    userId?: number;
    name?: string;
    userName?: string;
    email?: string;
    phone?: string;
    underUserId?: number;
    underUser?: User;
    roleId?: number;
    role?: Role;
    organisationId?: number;
    organisation?: Organisation;
    userDetails?: UserDetails;
    userCommission?: UserCommission[];
    created_at?: string;
    updated_at?: string;
}
