import {User} from '../../../common/model/User';
import Slab from '../../../common/model/Slab';
import Acl from '../utils/Acl';
import {Operations, Resources} from '../../../common/acl/rules';
import AuthorisationError from '../utils/errors/AuthorisationError';
import SlabItem from '../../../common/model/SlabItem';
import SlabRepository from '../database/repository/slab.repository';
import SlabItemRepository from '../database/repository/slab-item.repository';

export default class SlabService {
    slabRepository = new SlabRepository();
    slabItemRepository = new SlabItemRepository();

    constructor(private user: User) {
    }

    async create(slab: Slab) {
        const canAccess = await new Acl(Resources.Slab, this.user).asyncHasAccessTo(Operations.Create);
        if (!canAccess) {
            throw new AuthorisationError();
        }

        // Cleanse Slab And SlabItems For Insertion
        slab = {
            ...slab,
            slabId: undefined,
            createdBy: this.user.userId
        };

        const ids = await this.slabRepository.create(slab);
        return await this.slabRepository.findOne({slabId: ids[0]});
    }

    async addItem(slab: Slab, item: SlabItem) {
        const canAccess = await new Acl(Resources.Slab, this.user).asyncHasAccessTo(Operations.Create);
        if (!canAccess) {
            throw new AuthorisationError();
        }

        item = {
            ...item,
            slabId: slab.slabId
        } as SlabItem;

        await this.slabItemRepository.create(item);
        return await this.slabItemRepository.find({slabId: slab.slabId});
    }

    async delete(slab: Slab) {
        const canAccess = await new Acl(Resources.Slab, this.user).asyncHasAccessTo(Operations.Delete);
        if (!canAccess) {
            throw new AuthorisationError();
        }
        return await this.slabRepository.delete({slabId: slab.slabId, createdBy: this.user.userId});
    }

    async deleteItem(slab: Slab, item: SlabItem) {
        const canAccess = await new Acl(Resources.Slab, this.user).asyncHasAccessTo(Operations.Delete);
        if (!canAccess) {
            throw new AuthorisationError();
        }
        if (await this.slabRepository.find({slabId: slab.slabId, createdBy: this.user.userId})) {
            return await this.slabItemRepository.delete({slabItemId: item.slabItemId});
        } else {
            throw new AuthorisationError();
        }
    }

    async update(slab: Slab) {
        const canAccess = await new Acl(Resources.Slab, this.user).asyncHasAccessTo(Operations.Update);
        if (!canAccess) {
            throw new AuthorisationError();
        }

        slab = {
            ...slab,
            createdBy: this.user.userId
        };
        await this.slabRepository.update({slabId: slab.slabId}, slab);
        return this.slabRepository.findOne({slabId: slab.slabId});
    }

    async getSlabs() {
        const canAccess = await new Acl(Resources.Slab, this.user).asyncHasAccessTo(Operations.List);
        if (!canAccess) {
            throw new AuthorisationError();
        }
        return this.slabRepository.find({createdBy: this.user.userId});
    }

    async getSlab(id: number) {
        const canAccess = await new Acl(Resources.Slab, this.user).asyncHasAccessTo(Operations.List);
        if (!canAccess) {
            throw new AuthorisationError();
        }
        const slab = await this.slabRepository.findOne({createdBy: this.user.userId, slabId: id});
        slab.slabItems = await this.slabItemRepository.find({slabId: slab.slabId});
        return slab;
    }

}
