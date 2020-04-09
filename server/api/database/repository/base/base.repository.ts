import {IWrite} from '../interfaces/IWrite';
import {IRead} from '../interfaces/IRead';
import knex from '../../knex';
import loggerService from '../../../utils/logger.service';
import DatabaseError from '../../../utils/errors/DatabaseError';

// that class only can be extended
export abstract class BaseRepository<T> implements IWrite<T>, IRead<T> {
    // creating a property to use your code in all instances
    // that extends your base repository and reuse on methods of class
    // we created constructor with arguments to manipulate mongodb operations
    public logger = loggerService;

    protected constructor(private tableName: string) {
    }

    async count(item: T, db = knex): Promise<number | void> {
        try {
            const count = await db(this.tableName)
                .select('id')
                .where(item)
                .count('id as count');

            this.logger.info({
                file: 'BaseRepository',
                method: count,
                result: count
            });
        } catch (e) {
            throw new DatabaseError(e.message, 'BaseRepository:count', {item});
        }
        return 0;
    }

    // we add to method, the async keyword to manipulate the insert result
    // of method.
    async create(item: T | T[], db = knex): Promise<number[]> {
        try {
            const result = await db(this.tableName).insert<T>(item);
            return result as number[];
        } catch (e) {
            throw new DatabaseError(e.message, 'BaseRepository:create', {item});
        }
    }


    async update(query: T, item: T, db = knex): Promise<boolean> {
        try {
            const result = await db(this.tableName)
                .where(query)
                .update(item);
            return true;
        } catch (e) {
            throw new DatabaseError(e.message, 'BaseRepository:update', {item, query});
        }

    }

    async delete(query: T, db = knex): Promise<boolean> {
        try {
            const result = await db(this.tableName)
                .where(query)
                .del();
            return true;
        } catch (e) {
            throw new DatabaseError(e.message, 'BaseRepository:delete', {query});
        }
    }

    async find(item: T, db = knex): Promise<T[]> {
        try {
            return await db(this.tableName)
                .where(item);
        } catch (e) {
            throw new DatabaseError(e.message, 'BaseRepository:find', {item});
        }
    }

    async findOne(query: T, db = knex): Promise<T | null> {
        try {
            return await db(this.tableName)
                .where(query).first();
        } catch (e) {
            throw new DatabaseError(e.message, 'BaseRepository:findOne', {query});
        }
    }
}
