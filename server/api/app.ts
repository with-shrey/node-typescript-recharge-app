import 'reflect-metadata';
import express, {Application} from 'express';
import runLoaders from './loaders';
import * as env from 'dotenv';

env.config();

const app: Application = express();
runLoaders(app).then();
export default app;
