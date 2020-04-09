export default class DatabaseError extends Error {

    constructor(message: string, public file?: string, public parameters?: any) {
        super(message);
        this.name = 'DatabaseError';
    }
}
