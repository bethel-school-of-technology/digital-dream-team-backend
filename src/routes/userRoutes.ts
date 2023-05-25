import { Router } from 'express';
import { createUser, getUser, loginUser } from '../controllers/userController';

const router = Router();

router.post('/', createUser);
router.post('/login', loginUser);
router.get('/:id', getUser);

export default router;