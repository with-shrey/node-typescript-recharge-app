import {BaseRepository} from './base/base.repository';
import {User} from '../../../../common/model/User';
import {RoleTable, UserDetailsTable, UserTable} from '../../utils/table-names';
import knex from '../knex';
import LoggerService from '../../utils/logger.service';
import logger from '../../utils/logger.service';
import DatabaseError from '../../utils/errors/DatabaseError';
import UserCommissionRepository from './user-commission.repository';
import 'require-sql';
import HandleBars from 'handlebars';

export default class UserRepository extends BaseRepository<User> {

    constructor() {
        super(UserTable);
    }

    async assignRole(roleId: number, userId: number): Promise<boolean> {
        try {
            const result = await this.update({
                    userId,
                },
                {
                    roleId
                });
            console.log('UserMapping Updated', result);
            return true;
        } catch (e) {
            LoggerService.error({
                file: 'user.repository',
                message: 'Error Assigning Role',
                e
            });
            throw new DatabaseError(e.message, 'UserRepo:assignRole', {roleId, userId});

        }
    }

    async findOneByUsername(organisationId: number, username: string): Promise<User | null> {
        try {
            return await knex(UserTable)
                .where({
                    userName: username,
                    organisationId
                } as User).first();
        } catch (e) {
            throw new DatabaseError(e.message, 'UserRepo:findOneByUsername', {organisationId});
        }
    }

    async findOneWithAllRelatedModels(userFields: User): Promise<User | null> {
        try {
            const userRowsBuilder = knex(UserTable)
                .select('*');
            Object.keys(userFields).forEach(key => {
                userRowsBuilder.where(`User.${key}`, userFields[key]);
            });
            userRowsBuilder
                .join(RoleTable, `${UserTable}.roleId`, `${RoleTable}.roleId`)
                .leftOuterJoin(UserDetailsTable, `${UserTable}.userId`, `${UserDetailsTable}.userId`);

            const userRow = await userRowsBuilder.first();
            // Combine And Generate role obj
            const user: User = {
                ...userRow,
                role: {
                    roleId: userRow.roleId,
                    roleName: userRow.roleName,
                    priority: userRow.priority,
                },
                roleName: undefined,
                roleId: undefined,
                priority: undefined,

                userDetails: {
                    userDetailsId: userRow.userDetailsId,
                    userId: userRow.userId,
                    outletName: userRow.outletName,
                    aadhaar: userRow.aadhaar,
                    gstin: userRow.gstin,
                    address: userRow.address,
                    pincode: userRow.address,
                    alternateNumber: userRow.address,
                    pan: userRow.address
                },
                userDetailsId: undefined,
                outletName: undefined,
                aadhaar: undefined,
                gstin: undefined,
                address: undefined,
                pincode: undefined,
                alternateNumber: undefined,
                pan: undefined,
                userCommission: await new UserCommissionRepository().find({userId: userRow.userId})
            };
            // new Acl().asyncHasAccessTo()
            this.logger.debug({
                TAG: 'UserRepository',
                method: 'findOneWithRoles',
                user
            });
            return user;
        } catch (e) {
            this.logger.error(e, {
                TAG: 'UserRepository',
                method: 'findOneWithRoles',
            });
            throw new DatabaseError(e.message, 'UserRepo:findOneWithRoles', {userFields});
        }
    }

    async findOneWithRoles(userFields: User): Promise<User | null> {
        try {
            const userRowsBuilder = knex(UserTable)
                .select('*');
            Object.keys(userFields).forEach(key => {
                userRowsBuilder.where(`User.${key}`, userFields[key]);
            });
            userRowsBuilder
                .leftJoin(RoleTable, `${UserTable}.roleId`, `${RoleTable}.roleId`);

            const userRow = await userRowsBuilder.first();
            // Combine And Generate role obj
            const user: User = {
                ...userRow,
                role: {
                    roleId: userRow.roleId,
                    roleName: userRow.roleName,
                    priority: userRow.priority,
                },
                roleName: undefined,
                roleId: undefined,
                priority: undefined,
            };
            this.logger.debug({
                TAG: 'UserRepository',
                method: 'findOneWithRoles',
                user
            });
            return user;
        } catch (e) {
            this.logger.error(e, {
                TAG: 'UserRepository',
                method: 'findOneWithRoles',
            });
            throw new DatabaseError(e.message, 'UserRepo:findOneWithRoles', {userFields});
        }
    }

    async findAllNested(underUserId: number, organisationId: number) {
        const query = HandleBars.compile(require('../complex-queries/get-all-users.sql'))({
            userId: underUserId,
            organisationId
        });
        logger.info(query);
        return knex.raw(query);
    }
}
