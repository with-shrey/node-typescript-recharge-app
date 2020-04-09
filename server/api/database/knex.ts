import {AppConfig} from '../config/app-config';
import knex from 'knex';
import KnexConfig from '../config/knex-config';

export default knex(KnexConfig[AppConfig.NODE_ENV]);
