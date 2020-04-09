import {NextFunction, Router} from 'express';
import ProviderRepository from '../../database/repository/provider.repository';
import {body, sanitizeParam} from 'express-validator';
import validatorErrorHandler from '../../middlewares/validatorErrorHandler';
import errorConverter from '../../utils/errorConverter';
import Acl from '../../utils/Acl';
import AuthorisationError from '../../utils/errors/AuthorisationError';
import {Operations, Resources} from '../../../../common/acl/rules';

const providerController = Router();
const aclMiddleware = (resource, operation) => (req: any, res: any, next: NextFunction) => {
    if (!new Acl(resource, req.user).hasAccessTo(operation)) {
        next(new AuthorisationError());
    } else {
        next();
    }
};
providerController.get('/',
    aclMiddleware(Resources.Provider, Operations.List),
    async (req, res, next) => {
        try {
            const providers = await new ProviderRepository().find({});
            res.json(providers);
        } catch (e) {
            next(errorConverter(e));
        }
    });

providerController.post('/',
    aclMiddleware(Resources.Provider, Operations.Create),
    [
        body('providerName').isString(),
        body('providerType').isInt(),
        body('providerCode').isString(),
        validatorErrorHandler
    ],
    async (req, res, next) => {
        try {
            const status = await new ProviderRepository().create(req.body);
            res.json({status});
        } catch (e) {
            next(errorConverter(e));
        }
    });

providerController.patch('/:id',
    aclMiddleware(Resources.Provider, Operations.Update),
    [
        sanitizeParam('id').toInt(),
        body('providerName').isString().optional(),
        body('providerType').isInt().optional(),
        body('providerCode').isString().optional(),
        validatorErrorHandler
    ],
    async (req, res, next) => {
        const providerId: number = req.params.id;
        try {
            const status = await new ProviderRepository().update({providerId}, req.body);
            res.json({status});
        } catch (e) {
            next(errorConverter(e));
        }
    });

export default providerController;
