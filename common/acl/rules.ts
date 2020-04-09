import {RolesMap} from '../utils/roles';

export const Resources = {
    Organisation: 'organisation',
    User: 'user',
    Commission: 'Commission',
    Slab: 'Slab',
    Provider: 'Provider',
};


export const Operations = {
    Create: 'create',
    Update: 'update',
    Delete: 'delete',
    List: 'list',
    ALL: undefined
};

Operations.ALL = Object.values(Operations);

/**
 * {
 *     [role]: {
 *         [resource]: [operation1, operation2]
 *     }
 * }
 */
export class AclGenerator {
    public rules = {};
    private role: string;

    constructor() {
    }

    forRole(role: string) {
        this.role = role;
        this.rules[role] = this.rules[role] || {};
        return this;
    }

    canAccessResource(resource: string, properties: string[]) {
        this.rules[this.role][resource] = properties;
        return this;
    }
}


const aclGenerator = new AclGenerator();
aclGenerator
    .forRole(RolesMap.ADMIN)
    .canAccessResource(Resources.Organisation, Operations.ALL)
    .canAccessResource(Resources.User, Operations.ALL)
    .canAccessResource(Resources.Provider, Operations.ALL)
    .canAccessResource(Resources.Commission, Operations.ALL)
    .canAccessResource(Resources.Slab, Operations.ALL);


export default aclGenerator.rules;
