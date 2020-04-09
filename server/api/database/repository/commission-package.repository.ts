import {BaseRepository} from './base/base.repository';
import {CommissionItemTable, CommissionPackageTable} from '../../utils/table-names';
import CommissionPackage from '../../../../common/model/CommissionPackage';
import knex from '../knex';
import CommissionItem from '../../../../common/model/CommissionItem';
import logger from '../../utils/logger.service';
import DatabaseError from '../../utils/errors/DatabaseError';

export default class CommissionPackageRepository extends BaseRepository<CommissionPackage> {
    constructor() {
        super(CommissionPackageTable);
    }

    async createWithItems(commissionPackage: CommissionPackage[] | CommissionPackage, items: CommissionItem[]): Promise<boolean> {
        const txn = await knex.transaction();
        try {
            const commissionIds = await txn(CommissionPackageTable).insert(commissionPackage);
            logger.info({
                function: 'createCommission',
                message: 'Create Commission',
                commissionIds
            });
            items = items.map((item) => ({...item, commissionId: commissionIds[0]}));
            const commissionItems = await txn(CommissionItemTable).insert(items);
            logger.info({
                function: 'createCommission',
                message: 'Create Commission Item',
                commissionItems
            });
            await txn.commit();
            return true;
        } catch (e) {
            await txn.rollback();
            throw new DatabaseError(e.message, 'CommissionPackageRepo:createWithItems', {commissionPackage, items});
        }
    }

    async updateWithItems(commissionPackage: CommissionPackage, items: CommissionItem[]): Promise<boolean> {
        const txn = await knex.transaction();
        try {
            const commissionIds = await txn(CommissionPackageTable)
                .where({commissionId: commissionPackage.commissionId} as CommissionPackage)
                .update(commissionPackage);
            for (let item of items) {
                if (item.commissionItemId) {
                    await txn(CommissionItemTable)
                        .update(item).where({commissionItemId: item.commissionItemId} as CommissionItem);
                } else {
                    item = {...item, commissionId: commissionPackage.commissionId};
                    await txn(CommissionItemTable).insert(item);
                }
            }
            logger.info({
                function: 'createCommission',
                message: 'Updated Successfully',
                commissionIds
            });
            await txn.commit();
            return true;
        } catch (e) {
            await txn.rollback();
            console.error(e);
            const error = new DatabaseError(e.message, 'CommissionPackageRepo:updateWithItems');
            error.parameters = {commissionPackage, items};
            throw error;
        }
    }
}
