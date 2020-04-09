export default class AuthorisationError extends Error {
    constructor() {
        super('Operation Not Permitted On This Resource');
        this.name = 'AuthorisationError';
    }
}
