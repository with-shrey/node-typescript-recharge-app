import {BaseRepository} from './base/base.repository';
import CommissionItem from '../../../../common/model/CommissionItem';
import {CommissionItemTable, ProviderTable} from '../../utils/table-names';
import knex from '../knex';
import Knex from 'knex';
import DatabaseError from '../../utils/errors/DatabaseError';

export default class CommissionItemRepository extends BaseRepository<CommissionItem> {
    constructor() {
        super(CommissionItemTable);
    }

    async find(query: CommissionItem, db: Knex<any, unknown[]> = knex): Promise<CommissionItem[]> {
        try {
            const queryBuilder = knex(CommissionItemTable)
                .select('*');
            Object.keys(query).forEach(key => {
                queryBuilder.where(`CommissionItem.${key}`, query[key]);
            });
            queryBuilder
                .join(ProviderTable, `${CommissionItemTable}.providerId`, `${ProviderTable}.providerId`);

            let items = await queryBuilder;

            items = items.map((item) => {
                return {
                    ...item,
                    provider: {
                        providerId: item.providerId,
                        providerName: item.providerName,
                        providerType: item.providerType,
                        providerCode: item.providerCode
                    },
                    providerName: undefined,
                    providerType: undefined,
                    providerCode: undefined
                };
            });
            return items;
        } catch (e) {
            throw new DatabaseError(e.message, 'CommissionItemRepository:find', {query});
        }
    }
}
