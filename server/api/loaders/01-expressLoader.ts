'use strict';
import cors from 'cors';
import path from 'path';
import bodyParser from 'body-parser';
import express, {Application} from 'express';
import OrganisationMiddleware from '../middlewares/organisation.middleware';

async function expressLoader(app: Application) {
    app.use(cors({
        origin: '*',
        maxAge: 24 * 60,
        preflightContinue: false,
    }));
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(express.static(path.join(__dirname, '..', 'public')));
    app.use(OrganisationMiddleware);
}

export default expressLoader;
