import { Router } from 'express';
import * as requestController from '../controllers/requestController';

const router = Router();

router.post('/requests', requestController.createRequest);
router.put('/requests/:id/start', requestController.startWork);
router.put('/requests/:id/complete', requestController.completeRequest);
router.put('/requests/:id/cancel', requestController.cancelRequest);
router.get('/requests', requestController.getRequests);
router.get('/requests/open', requestController.getOpenRequests);  // Новый эндпоинт для незакрытых обращений
router.post('/requests/cancel-in-progress', requestController.cancelInProgressRequests);

export default router;
