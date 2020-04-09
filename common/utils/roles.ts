import Role from '../model/Role';

export const RolesMap = {
    ADMIN: 'admin',
    STAFF: 'staff',
    SUPER_DISTRIBUTOR: 'sd',
    MASTER_DISTRIBUTOR: 'md',
    DISTRIBUTOR: 'distributor',
    RETAILER: 'retailer',
    API_USER: 'api-user',
} as const;

export const RolePriority = {
    admin: 1,
    staff: 2,
    sd: 3,
    md: 4,
    distributor: 5,
    retailer: 6,
    'api-user': 7,
};

export const Roles = Object.values(RolesMap);

export default Roles.map(role => ({roleName: role, priority: RolePriority[role]})) as Role[];
