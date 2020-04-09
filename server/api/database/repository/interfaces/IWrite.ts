export interface IWrite<T> {
    create(item: T): Promise<number[]>;

    update(query: T, item: T): Promise<boolean>;

    delete(query: T): Promise<boolean>;
}
