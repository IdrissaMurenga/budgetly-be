import jwt from 'jsonwebtoken'
import { GraphQLError } from 'graphql'

export const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch (error) {
        throw new GraphQLError('invalid token')
    }
}