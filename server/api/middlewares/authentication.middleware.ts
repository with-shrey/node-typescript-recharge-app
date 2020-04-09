import AuthManagementService from '../services/auth-management-service';
import HttpError from '../utils/errors/HttpError';

async function AuthenticationMiddleware(req: any, res: any, next: any) {
    // @ts-ignore
    const token: string = req.headers.authorization;
    try {
        const user = await new AuthManagementService().decodeToken(token);
        if (user) {
            req.user = user;
            next();
        } else {
            throw new Error('User Not Found');
        }
    } catch (e) {
        const err = new HttpError(e.statusCode || 401, e.message, e.stack);
        err.parentName = 'CredentialsError';
        next(err);
    }
}

export default AuthenticationMiddleware;
