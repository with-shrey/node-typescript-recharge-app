export default class ValidationError extends Error {
    statusCode: number;

    constructor(public errors: any[]) {
        super('Error in Fields');
        this.name = 'ValidationError';
        this.statusCode = 422;
    }
}
