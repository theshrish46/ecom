import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from './../utils/ApiResponse.js'
import { asyncHandler } from '../utils/asyncHandler.js'
import User from "../models/user.model.js"

const generateAccessRefreshTokens = async (userId) => {
    try {
        const user = await User.findById(userId)

        const userAccessToken = user.generateAccessToken()
        const userRefreshToken = user.generateRefreshToken()

        user.refreshToken = userRefreshToken
        await user.save({ ValidateBeforeSave: false })

        return { userAccessToken, userRefreshToken }
    } catch (error) {
        throw new ApiError(400, "Something went wrong while generating the Tokens", error)
    }
}

const register = async (req, res) => {
    // TODO:;  Comple the work ASAP and get it pushed to the github
    const { name, username, email, password } = req.body
    console.log(name, username, email, password)
    if (!name || !username || !email || !password) {
        throw new ApiError(401, 'User details are mandatory')
    }
    const userDoc = await User.findOne({ email })
    if (userDoc) {
        throw new ApiError(401, 'User with this email already exists')
    }
    const user = await User.create({
        name,
        username,
        email,
        password
    })

    const createdUser = await User.findById(user._id).select("-password -refreshToken")
    if (!createdUser) {
        throw new ApiError(
            501,
            "Something went wrong while registering the User"
        )
    }
    return res.status(201).json(
        new ApiResponse(201, createdUser, "User registered Successfully")
    )
}

const login = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;

    if (!username && !email) {
        throw new ApiError(402, "Username or Email is required")
    }

    const user = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (!user) {
        throw new ApiError(403, `User with ${username} or ${email} doesn't exist`)
    }
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(401, "Unauthorized access Password is not matching")
    }

    const { userAccessToken, userRefreshToken } = await generateAccessRefreshTokens(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }
    return res.status(200)
        .cookie("AccessToken", userAccessToken, options)
        .cookie("RefreshToken", userRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    user: loggedInUser,
                    userAccessToken,
                    userRefreshToken
                },
                "User Logged in Successfully"
            )
        )


})

const logout = asyncHandler(async (req, res) => {
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {
                refreshToken: "",
            },
        },
        {
            new: true
        }
    )
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, "User successfully logged out"))
})

export { register, login, logout }
