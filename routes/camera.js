import { Router } from 'express';
const router = Router();

import {
  getAllCameras,
  getOneCamera,
  orderCameras,
} from '../controllers/camera.js';

router.get('/', getAllCameras);
router.get('/:id', getOneCamera);
router.post('/order', orderCameras);

export default router;
