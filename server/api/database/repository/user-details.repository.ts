import {BaseRepository} from './base/base.repository';
import UserDetails from '../../../../common/model/UserDetails';
import {UserDetailsTable} from '../../utils/table-names';

export default class UserDetailsRepository extends BaseRepository<UserDetails> {
    constructor() {
        super(UserDetailsTable);
    }
}
