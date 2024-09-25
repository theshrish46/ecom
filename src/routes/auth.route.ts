import express from 'express';
import { login, loginPage, register, registerPage } from '../controllers/auth.controller';


const router = express.Router()

router.get('/register', registerPage)

router.get('/login', loginPage)

router.post('/register', register)

router.post('/login', login)

export default router;