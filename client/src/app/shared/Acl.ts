import rules from '../../../../common/acl/rules';

export default class Acl {

    constructor(private roles: string[]) {
    }

    hasAccessTo(resource: string, property: string) {
        const hasAccess = this.roles.map(role => {
            const userRules = rules[role];
            if (!userRules) {
                return false;
            }
            const resourceRules: any[] = userRules[resource];
            if (!resourceRules) {
                return false;
            }
            return resourceRules.includes(property);
        });
        return hasAccess.some(access => access === true);
    }

}
