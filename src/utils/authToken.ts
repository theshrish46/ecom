import jwt from 'jsonwebtoken'

export const generateJwtToken = async (userId: string, username: string, email: string) => {
    const authToken = await jwt.sign({ userId, username, email }, process.env.JWT_SECRET!, {})
    console.log(authToken)
    return authToken
}