export default class HttpError extends Error {
    parentName: string;

    constructor(public statusCode: number, message: string, stack ?: any, name?: string) {
        super(message);
        this.name = 'HttpError';
        this.stack = stack;
    }

    setErrorName(parentName) {
        this.parentName = parentName;
        return this;
    }
}
