import * as Knex from 'knex';
import OrganisationRepository from '../repository/organisation.repository';
import LoggerService from '../../utils/logger.service';

export async function seed(knex: Knex): Promise<any> {
    // Deletes ALL existing entries
    const result = await new OrganisationRepository().create({
        orgName: 'Axom Wallet',
        host: 'localhost'
    });

    LoggerService.info({
        file: 'seed:organisation',
        status: result.toString()
    });
}
