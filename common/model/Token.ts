import {User} from './User';

export default interface Token {
    token: string;
    user: User;
}
