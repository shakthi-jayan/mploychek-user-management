import express from 'express';
const router = express.Router();
import { getAllUsers, addUser, loginUser } from '../controllers/userController.js';
import { getDashboardData } from '../controllers/dashboardController.js';

router.get('/', getAllUsers);
router.post('/add', addUser); 
router.post('/login', loginUser);

// Dashboard route
router.get('/dashboard', getDashboardData);

export default router;
