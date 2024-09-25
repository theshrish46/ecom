import { Response, Request } from 'express'
import UserModel from '../models/User.Model'
import { generateJwtToken } from '../utils/authToken'

export const registerPage = async (req: Request, res: Response) => {
    res.render('register', { title: "Register" })
}

export const loginPage = (req: Request, res: Response) => {
    res.render('login', { title: "Login" })
}

export const register = async (req: Request, res: Response) => {

    try {

        const body = req.body;

        const { name, email, password } = body
        const existingUser = await UserModel.findOne({ email })

        if (existingUser) {
            return res.status(409).json({ message: "User with this email alread exists" })
        }

        const user = await UserModel.create({
            name,
            email,
            password
        })

        console.log(user)
        const authToken = await generateJwtToken(user.id, user.name, user.email)
        const refreshToken = await generateJwtToken(user.id, user.name, user.email)


        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 48 * 60 * 60 * 1000
        })

        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).redirect('/auth/login')
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: "Failed to execute the request", data: error })
    }

}

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        const getUser = await UserModel.findOne({ email })

        if (!getUser) {
            return res.status(404).json({ message: "User not found" })
        }

        const isMatch = await getUser.comparePassword(password)

        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" })
        }

        const authToken = await generateJwtToken(getUser.id, getUser.name, getUser.email)
        res.cookie('authToken', authToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        })

        const refreshToken = await generateJwtToken(getUser.id, getUser.name, getUser.email)
        res.cookie('authToken', refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 24 * 60 * 60 * 1000
        })

        return res.status(200).redirect('/')

    } catch (error) {
        return res.status(500).json({
            message: "Failed to execute the request",
            data: error
        })
    }
}