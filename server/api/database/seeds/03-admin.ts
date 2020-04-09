import * as Knex from 'knex';
import LoggerService from '../../utils/logger.service';
import UserRepository from '../repository/user.repository';
import RoleRepository from '../repository/role.repository';
import {RolesMap} from '../../../../common/utils/roles';
import Role from '../../../../common/model/Role';
import crypto from 'crypto';
import OrganisationRepository from '../repository/organisation.repository';
import {User} from '../../../../common/model/User';
import UserDetailsRepository from '../repository/user-details.repository';

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    const userRepository = new UserRepository();
    const roleRepository = new RoleRepository();
    const orgRepository = new OrganisationRepository();
    const salt = crypto.randomBytes(16).toString('hex');
    const organisation = await orgRepository.findOneByName('Axom Wallet');
    // Hashing user's salt and password with 1000 iterations,
    const password: string = await new Promise((resolve, reject) => {
        crypto.pbkdf2(process.env.ADMIN_PASSWORD, salt,
            1000, 64, `sha512`, (err, key) => {
                if (err) {
                    return reject(err);
                }
                resolve(key.toString(`hex`));
            });
    });
    const userData = [
        {
            name: 'Dwipen',
            userName: process.env.ADMIN_USERNAME,
            password,
            email: 'admin@axomwallet.in',
            salt,
            organisationId: organisation.orgId,
            phone: process.env.ADMIN_PHONE
        }
    ];
    const result = await userRepository.create(userData);
    const result1 = await new UserDetailsRepository().create({
        userId: result[0],
        outletName: ''
    });
    if (!result) {
        throw new Error('Error Adding User');
    }
    LoggerService.info({
        file: 'seed:admin',
        status: result.toString()
    });

    const adminUser: User = await userRepository.findOneByUsername(organisation.orgId, userData[0].userName);
    const roleAdmin: Role | null = await roleRepository.findOneByName(RolesMap.ADMIN);
    await userRepository.assignRole(roleAdmin.roleId, adminUser.userId);

}
