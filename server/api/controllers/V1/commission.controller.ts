import {Router} from 'express';
import CommissionService from '../../services/commission-service';
import errorConverter from '../../utils/errorConverter';
import {createValidator} from 'express-joi-validation';
import Joi from '@hapi/joi';
import HttpError from '../../utils/errors/HttpError';
import joiValidationErrorMiddleware from '../../middlewares/joiValidationErrorMiddleware';
import JoiConfig from '../../utils/JoiConfig';

const commissionController: Router = Router();

const validator = createValidator({
    passError: true
});


commissionController.post('/',
    validator.body(Joi.object({
        commissionName: Joi.string().required(),
        items: Joi.array().items(Joi.object({
            providerId: Joi.number().required(),
            commission: Joi.number().default(0),
            isPercent: Joi.boolean().required(),
            slabId: Joi.any().default(null)
        })).required()
    }), JoiConfig)
    ,
    joiValidationErrorMiddleware,
    async (req, res, next) => {
        const commissionService = new CommissionService(req.user);
        try {
            const status = await commissionService.createCommissionPackAndItems(req.body);
            res.json({status});
        } catch (e) {
            next(errorConverter(e));
        }
    });

commissionController.put('/:id',
    validator.params(
        Joi.object({
            id: Joi.number().required()
        })
    ),
    validator.body(Joi.object({
            commissionId: Joi.number().required(),
            commissionName: Joi.string().required(),
            items: Joi.array().items(Joi.object({
                commissionItemId: Joi.number(),
                providerId: Joi.number().required(),
                commission: Joi.number().default(0),
                isPercent: Joi.boolean().required(),
                slabId: Joi.any().default(null)
            })).required()
        }),
        JoiConfig
    )
    ,
    joiValidationErrorMiddleware,
    async (req: any, res, next) => {
        const commissionService = new CommissionService(req.user);
        try {
            if (req.params.id !== req.body.commissionId) {
                throw new HttpError(400, 'Bad Commission ID');
            }
            const status = await commissionService.modifyCommissionPackAndItems(req.body);
            res.json({status});
        } catch (e) {
            next(errorConverter(e));
        }
    });

commissionController.get('/',
    async (req: any, res, next) => {
        const commissionService = new CommissionService(req.user);
        try {
            const packages = await commissionService.getCommissionPackages();
            res.json(packages);
        } catch (e) {
            next(errorConverter(e));
        }
    });

commissionController.get('/:id',
    validator.params(
        Joi.object({
            id: Joi.number().required()
        })
    ),
    joiValidationErrorMiddleware,
    async (req: any, res, next) => {
        const commissionService = new CommissionService(req.user);
        try {
            const commissionPackage = await commissionService.getCommissionPackage(req.params.id);
            res.json(commissionPackage);
        } catch (e) {
            next(errorConverter(e));
        }
    });

export default commissionController;
