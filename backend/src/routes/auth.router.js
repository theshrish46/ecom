import express, { Router } from 'express'
import { register, login, logout } from './../controllers/user.controller.js'
import { verifyJwt } from '../middlewares/auth.middlewares.js'
const userRouter = Router()



userRouter.post('/register', register)
userRouter.post('/login', login)
userRouter.post('/logout', verifyJwt, logout)

export { userRouter }