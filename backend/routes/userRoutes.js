import express from 'express';
const router = express.Router();
import { getAllUsers, addUser, loginUser } from '../controllers/userController.js';

router.get('/', getAllUsers);
router.post('/add', addUser); 
router.post('/login', loginUser);

export default router;