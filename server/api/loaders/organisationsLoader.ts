'use strict';
import {Application} from 'express';
import OrganisationRepository from '../database/repository/organisation.repository';
import IGlobal from '../utils/@types/IGlobal';
import {ORGANISATION_ALL} from '../utils/events';

async function loadOrganisations(organisationRepository: OrganisationRepository) {
    const organisations = await organisationRepository.find({});
    const orgMap = {};
    organisations.forEach(org => {
        // @ts-ignore
        orgMap[org.host] = org;
    });
    (global as IGlobal).Organisations = orgMap;
}

async function organisationsLoader(app: Application) {
    const organisationRepository = new OrganisationRepository();
    await loadOrganisations(organisationRepository);
    app.on(ORGANISATION_ALL, async (app) => {
        await loadOrganisations(organisationRepository);
    });

}

export default organisationsLoader;
