import {NextFunction, Router} from 'express';
import {check} from 'express-validator';
import AuthManagementService from '../../services/auth-management-service';
import validatorErrorHandler from '../../middlewares/validatorErrorHandler';
import errorConverter from '../../utils/errorConverter';
import AuthenticationMiddleware from '../../middlewares/authentication.middleware';
import {createValidator} from 'express-joi-validation';
import Joi from '@hapi/joi';
import joiValidationErrorMiddleware from '../../middlewares/joiValidationErrorMiddleware';
import UserService from '../../services/user-service';

const router: Router = Router();
const validator = createValidator({
    passError: true
});

router.post('/login',
    [
        check('userName').isString(),
        check('password').isLength({min: 6}),
        validatorErrorHandler
    ],
    async (req: any, res: any, next: NextFunction) => {
        const userService = new AuthManagementService();
        try {
            const message: any = await userService.loginUser(req.organisation.orgId, req.body);
            res.json(message);
        } catch (error) {
            return next(errorConverter(error));
        }
    });

router.post('/verifyOtp',
    [
        check('userName').isString(),
        check('otp').isString().isLength({min: 6, max: 6}),
        validatorErrorHandler
    ],
    async (req: any, res: any, next: NextFunction) => {
        const userService = new AuthManagementService();
        try {
            const token: any = await userService.verifyOtp(req.organisation.orgId, req.body, req.body.otp);
            res.json(token);
        } catch (error) {
            return next(errorConverter(error));
        }
    });


router.get('/:role',
    AuthenticationMiddleware,
    validator.params(
        Joi.object({
            role: Joi.string().required()
        })
    ),
    joiValidationErrorMiddleware,
    async (req: any, res, next) => {
        try {
            const userService = new UserService(req.organisation, req.user);
        } catch (e) {
            next(errorConverter(e));
        }
    });

router.post('/:role',
    AuthenticationMiddleware,
    validator.params(
        Joi.object({
            role: Joi.string().required()
        })
    ),
    joiValidationErrorMiddleware,
    async (req, res, next) => {
        try {

        } catch (e) {
            next(errorConverter(e));
        }
    });

router.put('/:role',
    AuthenticationMiddleware,
    validator.params(
        Joi.object({
            role: Joi.string().required()
        })
    ),
    joiValidationErrorMiddleware,
    async (req, res, next) => {
        try {

        } catch (e) {
            next(errorConverter(e));
        }
    });

export default router;

