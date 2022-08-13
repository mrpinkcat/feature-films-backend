import { Router } from 'express';
import { isAuthenticated } from '../../utils/midewares.js';

const router = Router();

router.get('/', isAuthenticated, (req, res) => res.send({ msg: 'success' }));

export default router;
