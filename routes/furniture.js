import { Router } from 'express';
const router = Router();

import {
  getAllFurniture,
  getOneFurniture,
  orderFurniture,
} from '../controllers/furniture.js';

router.get('/', getAllFurniture);
router.get('/:id', getOneFurniture);
router.post('/order', orderFurniture);

export default router;
