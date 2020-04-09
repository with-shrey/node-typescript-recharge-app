import V1Router from './V1';
import express, {Router} from 'express';

const router: Router = express.Router();
/* GET home page. */
router.use('/V1', V1Router);

export default router;
