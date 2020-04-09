import UserRepository from '../database/repository/user.repository';
import {User} from '../../../common/model/User';
import Acl from '../utils/Acl';
import {Operations, Resources} from '../../../common/acl/rules';
import {RolePriority} from '../../../common/utils/roles';
import AuthorisationError from '../utils/errors/AuthorisationError';
import UserCommission from '../../../common/model/UserCommission';
import UserDetails from '../../../common/model/UserDetails';
import UserDetailsRepository from '../database/repository/user-details.repository';
import UserCommissionRepository from '../database/repository/user-commission.repository';
import knex from '../database/knex';
import DatabaseError from '../utils/errors/DatabaseError';
import Organisation from '../../../common/model/Organisation';

export default class UserService {
    userRepository = new UserRepository();
    userDetailsRepository = new UserDetailsRepository();
    userCommissionRepository = new UserCommissionRepository();
    acl: Acl;

    constructor(private org: Organisation, private user: User) {
        this.acl = new Acl(Resources.User, user);

    }

    async addUser(roleString: string, user: User, userDetails: UserDetails, userCommission: UserCommission[]) {
        const hasAccess = await this.acl.asyncHasAccessTo(Operations.Create, RolePriority[roleString]);
        if (!hasAccess) {
            throw new AuthorisationError();
        }
        user = {
            ...user,
            underUserId: this.user.userId,
            userDetails: undefined,
            organisationId: this.org.orgId,
            // @ts-ignore
            userCommission: undefined
        };
        const txn = await knex.transaction();
        try {
            const userIds = await this.userRepository.create(user, txn);
            await this.userDetailsRepository.create({
                ...userDetails,
                userId: userIds[0],
            }, txn);
            userCommission = userCommission.map(userCommissionRow => ({
                ...userCommissionRow,
                userId: userIds[0],
            }));
            await this.userCommissionRepository.create(userCommission, txn);
            await txn.commit();
            return true;
        } catch (e) {
            await txn.rollback();
            throw new DatabaseError(e.message, 'UserService:createWithItems', {user, userDetails, userCommission});
        }
    }

    async modifyUser(roleString: string, user: User, userDetails: UserDetails, userCommission: UserCommission[]) {
        const hasAccess = await this.acl.asyncHasAccessTo(Operations.Create, RolePriority[roleString]);
        if (!hasAccess) {
            throw new AuthorisationError();
        }
        user = {
            ...user,
            userDetails: undefined,
            // @ts-ignore
            userCommission: undefined
        };

    }

    async getUser(roleString: string, userId: number) {

        const hasAccess = await this.acl.asyncHasAccessTo(Operations.List, RolePriority[roleString]);
        if (!hasAccess) {
            throw new AuthorisationError();
        }
        await this.userRepository.findOneWithAllRelatedModels({organisationId: this.org.orgId, userId});
    }

    async getUsers(roleString: string, underUserId: number) {
        const hasAccess = await this.acl.asyncHasAccessTo(Operations.List, RolePriority[roleString]);
        if (!hasAccess) {
            throw new AuthorisationError();
        }
        await this.userRepository.find({organisationId: this.org.orgId, underUserId: underUserId ? underUserId : this.user.userId});
    }

    async getAllUsersUnderUser() {
        return await this.userRepository.findAllNested(this.org.orgId, this.user.userId);
    }
}
