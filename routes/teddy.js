import { Router } from 'express';
const router = Router();

import {
  getAllTeddies,
  getOneTeddy,
  orderTeddies,
} from '../controllers/teddy.js';

router.get('/', getAllTeddies);
router.get('/:id', getOneTeddy);
router.post('/order', orderTeddies);

export default router;
