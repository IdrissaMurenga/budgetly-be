import { verifyToken } from './verifyToken.js'
import User from '../db/models/userModel.js'
import cookie from 'cookie'

export const context = async ({ req, res }) => {
    // Parse cookies from the request header
    const cookies = cookie.parse(req.headers.cookie || '')
    const token = cookies['auth-token'] // Extract the authentication token from cookies

    const baseContext = {res, user: null }    // Default context if no user

    if (!token) return baseContext

    try {
        const decoded = verifyToken(token)

        if(!decoded?.id) return baseContext

        const user = await User.findById(decoded.id)
        if (!user) return baseContext

        return { res, user }

    } catch (error) {
        console.error('TOKEN_VERIFICATION_ERROR:', error.message);
        return baseContext;
    }
}