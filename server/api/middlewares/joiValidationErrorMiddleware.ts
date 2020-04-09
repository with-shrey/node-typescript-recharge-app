import Express, {NextFunction} from 'express';
import ValidationError from '../utils/errors/ValidationError';

export default function(err, req: Express.Request, res: Express.Response, next: NextFunction) {
    if (err.error && err.error.details) {
        const errors = err.error.details;
        return next(new ValidationError(errors));
    } else {
        return next(err);
    }
}
