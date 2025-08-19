import { verifyToken } from './verifyToken.js'
import User from '../db/models/userModel.js'

export const context = async ({ req, res }) => {

    const token = req?.headers?.authorization?.split('Bearer ')[1]

    if (!token) return {}
    
    try {
        const decoded = verifyToken(token)

        const user = await User.findById(decoded?.id)

        return user;
        
    } catch (error) {
        console.error('TOKEN_VERIFICATION_ERROR:', error.message);
        return {};
    }
}