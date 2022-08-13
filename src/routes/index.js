import { Router } from 'express';
import authRouter from './auth/index.js';
import searchRouter from './search/index.js';

const router = Router();

router.use('/auth', authRouter);
router.use('/search', searchRouter);

export default router;
