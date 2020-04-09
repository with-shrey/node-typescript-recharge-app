import Slab from '../../../../common/model/Slab';
import {BaseRepository} from './base/base.repository';
import {SlabTable} from '../../utils/table-names';

export default class SlabRepository extends BaseRepository<Slab> {
    constructor() {
        super(SlabTable);
    }
}
