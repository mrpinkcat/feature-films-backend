import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get('/discord', passport.authenticate('discord'), (req, res) => {
  return res.send(200);
});

router.get('/discord/callback', passport.authenticate('discord'), (req, res) => {
  return res.send({ msg: 'success' });
});

router.get('/status', (req, res) => {
  return req.user ? res.send(req.user) : res.status(401).send({ msg: 'Unauthorized' });
});

export default router;