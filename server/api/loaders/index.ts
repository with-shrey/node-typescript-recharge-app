import routesLoader from './02-routesLoader';
import expressLoader from './01-expressLoader';
import {Application} from 'express';
import organisationsLoader from './organisationsLoader';
import errorHandler from './errorHandler';

/**
 * Call All Loaders that will bootstrap the express application
 * @param app : ExpressApplication
 */
async function loaders(app: Application) {
    await organisationsLoader(app);
    await expressLoader(app);
    await routesLoader(app);
    await errorHandler(app);
}

export default loaders;
