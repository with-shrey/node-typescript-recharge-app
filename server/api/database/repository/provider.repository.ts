import {BaseRepository} from './base/base.repository';
import Provider from '../../../../common/model/Provider';
import {ProviderTable} from '../../utils/table-names';

export default class ProviderRepository extends BaseRepository<Provider> {
    constructor() {
        super(ProviderTable);
    }
}
