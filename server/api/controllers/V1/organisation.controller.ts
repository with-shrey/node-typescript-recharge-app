import express, {NextFunction, Router} from 'express';
import {body, sanitizeParam} from 'express-validator';
import validatorErrorHandler from '../../middlewares/validatorErrorHandler';
import OrganisationService from '../../services/organisation-service';
import errorConverter from '../../utils/errorConverter';
import Organisation from '../../../../common/model/Organisation';
import {ORGANISATION_ALL} from '../../utils/events';

const organisationController: Router = Router();

organisationController.post('/',
    [
        body('orgName').isString(),
        body('host').isString(),
        validatorErrorHandler
    ],
    async (req: any, res: express.Response, next: NextFunction) => {
        const organisationService = new OrganisationService(req.user);
        try {
            req.body.orgId = undefined;
            const status = await organisationService.addOrganisation(req.body);
            req.app.emit(ORGANISATION_ALL);
            res.json({status: !!status});
        } catch (error) {
            return next(errorConverter(error));
        }
    });

organisationController.get('/',
    async (req: any, res: express.Response, next: NextFunction) => {
        console.log(req.user);
        const organisationService = new OrganisationService(req.user);
        try {
            const organisations: Organisation[] = await organisationService.listOrganisations();
            res.json(organisations);
        } catch (error) {
            return next(errorConverter(error));
        }
    });

organisationController.get('/:id',
    async (req: any, res: express.Response, next: NextFunction) => {
        console.log(req.user);
        const organisationService = new OrganisationService(req.user);
        try {
            const organisation: Organisation = await organisationService.findOne(req.params.id);
            res.json(organisation);
        } catch (error) {
            return next(errorConverter(error));
        }
    });

organisationController.patch('/:id',
    [
        sanitizeParam('id').toInt(),
        body('orgName').optional().isString(),
        body('host').optional().isString(),
        validatorErrorHandler
    ],
    async (req: any, res: express.Response, next: NextFunction) => {
        const id: number = req.params.id;
        const organisationService = new OrganisationService(req.user);
        try {
            const status: boolean = await organisationService.updateOrganisation(id, req.body);
            req.app.emit(ORGANISATION_ALL);
            res.json({status});
        } catch (error) {
            return next(errorConverter(error));
        }
    });

export default organisationController;

