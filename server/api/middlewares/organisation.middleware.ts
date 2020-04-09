import IGlobal from '../utils/@types/IGlobal';
import {NextFunction, Response} from 'express';
import HttpError from '../utils/errors/HttpError';

export default function OrganisationMiddleware(req: any, res: Response, next: NextFunction) {
    // @ts-ignore
    const hostName: string = req.headers.hostname || req.query.hostname || req.hostname;
    req.organisation = (global as IGlobal).Organisations[hostName];
    if (req.organisation) {
        // @ts-ignore
        return next();
    } else {
        return next(new HttpError(400, 'Organisation Not Found OR Missing "hostname" in Header'));
    }
}
