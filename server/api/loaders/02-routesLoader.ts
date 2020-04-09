'use strict';
import indexRouter from '../controllers';
import {Application} from 'express';

async function routesLoader(app: Application) {
    app.use('/api', indexRouter);
}

export default routesLoader;
