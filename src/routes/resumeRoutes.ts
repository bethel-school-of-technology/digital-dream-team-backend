import { Router } from 'express';
import { addResume, editResume, deleteResume, getAllResumes, getOneResume } from '../controllers/resumeController';
import { verifyUser } from '../services/auth';
import { Request, Response } from 'express';

const router = Router();

router.get('/', getAllResumes, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});
router.get('/:id', getOneResume, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});
router.post('/', addResume, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});
router.put('/:id', editResume, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});
router.delete('/:id', deleteResume, verifyUser, (req: Request, res: Response) => {
    const userId = req.body.userId;
    res.json({ message: 'Protected route accessed!', userId});
});

export default router;