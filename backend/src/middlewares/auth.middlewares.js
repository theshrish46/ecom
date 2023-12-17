import User from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from 'jsonwebtoken'




export const verifyJwt = asyncHandler(async (req, _, next) => {
    try {
        const token = req.cookies?.AccessToken || req.header("Authorization").replace("Bearer", "");
        if (!token) {
            throw new ApiError(401, "Unauthorized access. Token is necessasry");
        }
        const decodedToken = jwt.decode(token, process.env.ACCESS_TOKEN);

        const user = await User.findById(decodedToken._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(402, "Invalid Access Token");
        }

        req.user = user;
        next()
    } catch (error) {
        console.log("Error while destructuring the jwt token", error)
        throw new ApiError(401, error?.message || "Invalid access token")
    }
})