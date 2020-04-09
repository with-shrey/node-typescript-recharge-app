import CommissionPackage from '../../../common/model/CommissionPackage';
import CommissionPackageRepository from '../database/repository/commission-package.repository';
import {User} from '../../../common/model/User';
import Acl from '../utils/Acl';
import {Operations, Resources} from '../../../common/acl/rules';
import AuthorisationError from '../utils/errors/AuthorisationError';
import ProviderRepository from '../database/repository/provider.repository';
import CommissionItem from '../../../common/model/CommissionItem';
import groupBy from 'lodash/groupBy';
import CommissionItemRepository from '../database/repository/commission-item-repository';

export default class CommissionService {
    commissionRepository = new CommissionPackageRepository();
    commissionItemRepository = new CommissionItemRepository();
    providerRepository = new ProviderRepository();

    constructor(private user: User) {
    }

    async createCommissionPackAndItems(commissionPackage: CommissionPackage) {
        const canAccess = await new Acl(Resources.Commission, this.user).asyncHasAccessTo(Operations.Create);
        if (!canAccess) {
            throw new AuthorisationError();
        }

        // Cleanse Commission And Items For Insertion
        commissionPackage = {
            ...commissionPackage,
            commissionId: undefined,
            createdBy: this.user.userId
        };
        let items: CommissionItem[] = commissionPackage.items;
        items = items.map(item => (
            {
                ...item,
                commissionItemId: undefined
            }));
        items = await this.addMissingCommissionItems(items);
        delete commissionPackage.items;
        return await this.commissionRepository.createWithItems(commissionPackage, items);
    }

    async modifyCommissionPackAndItems(commissionPackage: CommissionPackage) {
        const canAccess = await new Acl(Resources.Commission, this.user).asyncHasAccessTo(Operations.Update);
        if (!canAccess) {
            throw new AuthorisationError();
        }

        commissionPackage = {
            ...commissionPackage,
            createdBy: this.user.userId
        };
        let items: CommissionItem[] = commissionPackage.items;
        items = items.map(item => ({
            ...item, commissionItemId: item.commissionItemId ? item.commissionItemId : undefined
            , commissionId: commissionPackage.commissionId
        }));
        items = await this.addMissingCommissionItems(items);
        delete commissionPackage.items;
        return await this.commissionRepository.updateWithItems(commissionPackage, items);
    }

    async getCommissionPackages() {
        const canAccess = await new Acl(Resources.Commission, this.user).asyncHasAccessTo(Operations.List);
        if (!canAccess) {
            throw new AuthorisationError();
        }
        return this.commissionRepository.find({createdBy: this.user.userId});
    }

    async getCommissionPackage(id: number) {
        const canAccess = await new Acl(Resources.Commission, this.user).asyncHasAccessTo(Operations.List);
        if (!canAccess) {
            throw new AuthorisationError();
        }
        const commissionPackage = await this.commissionRepository.findOne({createdBy: this.user.userId, commissionId: id});
        commissionPackage.items = await this.commissionItemRepository.find({commissionId: commissionPackage.commissionId});
        return commissionPackage;
    }

    private async addMissingCommissionItems(items) {
        const groupedByProvider = groupBy(items, (item) => (item.providerId));
        const providers = await this.providerRepository.find({});
        if (providers.length !== Object.keys(groupedByProvider).length) {
            providers.forEach(provider => {
                if (!groupedByProvider[provider.providerId]) {
                    items.push({
                        providerId: provider.providerId,
                        commission: 0,
                        isPercent: true,
                        slabId: null
                    } as CommissionItem);
                }
            });
        }
        return items;
    }
}
