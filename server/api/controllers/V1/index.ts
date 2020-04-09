import express from 'express';
import UserController from './user.controller';
import organisationController from './organisation.controller';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';
import commissionController from './commission.controller';
import providerController from './provider.controller';
import slabController from './slab.controller';

const router = express.Router();
/* GET users listing. */

router.use('/user', UserController);
router.use('/organisation',
    AuthenticationMiddleware,
    organisationController);
router.use('/commission',
    AuthenticationMiddleware,
    commissionController);
router.use('/slab',
    AuthenticationMiddleware,
    slabController);
router.use('/provider',
    AuthenticationMiddleware,
    providerController);

export default router;
