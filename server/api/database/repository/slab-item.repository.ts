import {BaseRepository} from './base/base.repository';
import SlabItem from '../../../../common/model/SlabItem';
import {SlabItemTable} from '../../utils/table-names';

export default class SlabItemRepository extends BaseRepository<SlabItem> {
    constructor() {
        super(SlabItemTable);
    }
}
