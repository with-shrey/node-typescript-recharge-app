import {BaseRepository} from './base/base.repository';
import Organisation from '../../../../common/model/Organisation';
import {OrganisationTable} from '../../utils/table-names';
import knex from '../knex';
import DatabaseError from '../../utils/errors/DatabaseError';

export default class OrganisationRepository extends BaseRepository<Organisation> {
    constructor() {
        super(OrganisationTable);
    }

    async findOneByName(name: string): Promise<Organisation> {
        try {
            return await knex(OrganisationTable)
                .where({orgName: name}).first();
        } catch (e) {
            throw new DatabaseError(e.message, 'OrgRepo:findOneByName', {name});
        }
    }
}
