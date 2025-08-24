import { verifyToken } from './verifyToken.js'
import User from '../db/models/userModel.js'
import cookie from 'cookie'

export const context = async ({ req, res }) => {

    // const token = req?.headers?.authorization?.split('Bearer ')[1]

    const cookies = cookie.parse(req.headers.cookie || '')

    const token = cookies['auth-token']

    if (!token) return {}
    
    try {
        const decoded = verifyToken(token)

        const user = await User.findById(decoded?.id)

        return { user, res }
        
    } catch (error) {
        console.error('TOKEN_VERIFICATION_ERROR:', error.message);
        return {};
    }
}