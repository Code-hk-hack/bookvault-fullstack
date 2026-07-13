import { Router } from 'express';
import { createUser, getUserProfile } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.get('/:id', getUserProfile);

export default router;