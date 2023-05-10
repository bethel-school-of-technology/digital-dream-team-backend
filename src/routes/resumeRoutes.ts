import { Router } from 'express';
import { addResume, editResume, deleteResume, getAllResumes, getOneResume } from '../controllers/resumeController';

const router = Router();

router.get('/', getAllResumes);
router.get('/:id', getOneResume);
router.post('/', addResume);
router.put('/:id', editResume);
router.delete('/:id', deleteResume);

export default router;