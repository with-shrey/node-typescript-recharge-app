import {validationResult} from 'express-validator';
import Express, {NextFunction} from 'express';
import ValidationError from '../utils/errors/ValidationError';

export default function(req: Express.Request, res: Express.Response, next: NextFunction) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return next(new ValidationError(errors.array().map(error => ({...error, message: error.msg}))));
    } else {
        return next();
    }
}
