import { Router } from 'express';
import {
  addToCollection,
  getUserCollection,
  removeFromCollection,
} from '../controllers/collectionController';

const router = Router();

router.post('/', addToCollection);
router.get('/:userId', getUserCollection);
router.delete('/', removeFromCollection);

export default router;