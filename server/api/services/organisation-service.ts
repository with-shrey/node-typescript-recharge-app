import OrganisationRepository from '../database/repository/organisation.repository';
import Acl from '../utils/Acl';
import {User} from '../../../common/model/User';
import {Operations, Resources} from '../../../common/acl/rules';
import AuthorisationError from '../utils/errors/AuthorisationError';
import Organisation from '../../../common/model/Organisation';

export default class OrganisationService {
    private organisationRepository: OrganisationRepository;
    private acl: Acl;

    constructor(private user: User) {
        this.organisationRepository = new OrganisationRepository();
        this.acl = new Acl(Resources.Organisation, user);
    }

    async addOrganisation(organsationDTO: Organisation) {
        if (!this.acl.hasAccessTo(Operations.Create)) {
            throw new AuthorisationError();
        }
        return await this.organisationRepository.create(organsationDTO);
    }

    async listOrganisations() {
        if (!this.acl.hasAccessTo(Operations.List)) {
            throw new AuthorisationError();
        }
        return await this.organisationRepository.find({});
    }

    async updateOrganisation(id: number, organsationDTO: Organisation) {
        if (!this.acl.hasAccessTo(Operations.Update)) {
            throw new AuthorisationError();
        }
        return await this.organisationRepository.update({orgId: id}, organsationDTO);
    }

    async findOne(id: number) {
        if (!this.acl.hasAccessTo(Operations.List)) {
            throw new AuthorisationError();
        }
        return await this.organisationRepository.findOne({orgId: id});
    }
}
