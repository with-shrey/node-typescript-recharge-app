import {Router} from 'express';
import SlabService from '../../services/slab-service';
import errorConverter from '../../utils/errorConverter';
import HttpError from '../../utils/errors/HttpError';
import joiValidationErrorMiddleware from '../../middlewares/joiValidationErrorMiddleware';
import {createValidator} from 'express-joi-validation';
import Joi from '@hapi/joi';
import JoiConfig from '../../utils/JoiConfig';
import SlabItem from '../../../../common/model/SlabItem';

const slabController: Router = Router();

const validator = createValidator({
    passError: true
});


slabController.post('/',
    validator.body(Joi.object({
            slabName: Joi.string().required()
        })
        , JoiConfig),
    joiValidationErrorMiddleware,
    async (req, res, next) => {
        const slabService = new SlabService(req.user);
        try {
            const status = await slabService.create(req.body);
            res.json(status);
        } catch (e) {
            next(errorConverter(e));
        }
    });

slabController.put('/:id',
    validator.params(
        Joi.object({
            id: Joi.number().required()
        })
    ),
    validator.body(Joi.object({
        slabId: Joi.number().required(),
        slabName: Joi.string().required(),
    }), JoiConfig),
    joiValidationErrorMiddleware,
    async (req: any, res, next) => {
        const slabService = new SlabService(req.user);
        try {
            if (req.params.id !== req.body.slabId) {
                throw new HttpError(400, 'Bad Slab ID');
            }
            const status = await slabService.update(req.body);
            res.json(status);
        } catch (e) {
            next(errorConverter(e));
        }
    });


slabController.post('/:id/slabItem',
    validator.params(
        Joi.object({
            id: Joi.number().required()
        })
    ),
    validator.body(Joi.object({
        min: Joi.number().required(),
        max: Joi.number().required(),
        commission: Joi.number().required().default(0),
        commissionIsPercent: Joi.boolean().required().default(true),
        surcharge: Joi.number().required().default(0),
        surchargeIsPercent: Joi.boolean().required().default(true),
        tds: Joi.number().required().default(0),
        gst: Joi.number().required().default(0),
    } as SlabItem), JoiConfig),
    joiValidationErrorMiddleware,
    async (req, res, next) => {
        const slabService = new SlabService(req.user);
        try {
            const slabItems = await slabService.addItem({slabId: req.params.id}, req.body);
            res.json(slabItems);
        } catch (e) {
            next(errorConverter(e));
        }
    });

slabController.delete('/:id/slabItem/:slabItemId',
    validator.params(
        Joi.object({
            id: Joi.number().required(),
            slabItemId: Joi.number().required()
        })
    ),
    joiValidationErrorMiddleware,
    async (req, res, next) => {
        const slabService = new SlabService(req.user);
        try {
            const status = await slabService.deleteItem({slabId: req.params.id},
                {slabItemId: req.params.slabItemId});
            res.json({status});
        } catch (e) {
            next(errorConverter(e));
        }
    });

slabController.delete('/:id',
    validator.params(
        Joi.object({
            id: Joi.number().required()
        })
    ),
    joiValidationErrorMiddleware,
    async (req, res, next) => {
        const slabService = new SlabService(req.user);
        try {
            const status = await slabService.delete({slabId: req.params.id});
            res.json({status});
        } catch (e) {
            next(errorConverter(e));
        }
    });

slabController.get('/',
    async (req: any, res, next) => {
        const slabService = new SlabService(req.user);
        try {
            const packages = await slabService.getSlabs();
            res.json(packages);
        } catch (e) {
            next(errorConverter(e));
        }
    });

slabController.get('/:id',
    validator.params(
        Joi.object({
            id: Joi.number().required()
        })
    ),
    joiValidationErrorMiddleware,
    async (req: any, res, next) => {
        const slabService = new SlabService(req.user);
        try {
            const slabPackage = await slabService.getSlab(req.params.id);
            res.json(slabPackage);
        } catch (e) {
            next(errorConverter(e));
        }
    });

export default slabController;
