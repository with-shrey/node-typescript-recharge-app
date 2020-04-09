'use strict';
import express, {Application, NextFunction} from 'express';
import HttpError from '../utils/errors/HttpError';
import ValidationError from '../utils/errors/ValidationError';

async function errorHandler(app: Application) {
    app.use((err: any, req: express.Request, res: express.Response, next: NextFunction) => {
        let stack = [];
        try {
            stack = err.stack.split('\n');
        } catch (e) {
        }
        if (err.name === 'ValidationError') {
            res.status(400).json({
                statusCode: err.statusCode,
                name: err.name,
                errors: err.errors,
                stack
            });
        } else {
            const statusCode = err.name === 'HttpError' ? err.statusCode : 500;
            const errors = err.message.split('\n').map(message => ({message}));
            res.status(statusCode).json({
                statusCode,
                name: err.parentName || err.name,
                errors,
                stack
            });
        }
    });
}

export default errorHandler;
