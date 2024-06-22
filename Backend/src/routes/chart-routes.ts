import { Router } from 'express';
import checkAuth from '../middleware/check-auth';
import chartController from '../controllers/chart-controller';

const router = Router();

router.get('/user/:uid', chartController.userChart);

export default router;
