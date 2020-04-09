export interface IRead<T> {
    find(item: T): Promise<T[]>;

    findOne(query: T): Promise<T | null>;
}
