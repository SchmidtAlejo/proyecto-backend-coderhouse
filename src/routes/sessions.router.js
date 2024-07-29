import { Router } from 'express';
import SessionsController from '../controllers/sessions.controller.js';

const router = Router();

router.post('/login', SessionsController.login);
router.post('/signup', SessionsController.signup);
router.post('/forgot-password', SessionsController.forgotPassword);
router.post('/reset-password/:token', SessionsController.changePassword);
router.get('/logout', SessionsController.logout);
router.get('/github', SessionsController.githubAuth);
router.get('/callbackGithub', SessionsController.githubCallback);
router.get('/errorGitHub', SessionsController.githubError);
router.get('/current', SessionsController.getCurrentUser);

export default router;

