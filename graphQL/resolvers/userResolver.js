import bcrypt from "bcryptjs";
import { GraphQLError } from "graphql";
import User from "../../db/models/userModel.js";
import { authCheck } from "../../utils/authCheck.js";
import { generateToken } from "../../utils/generateToken.js";

export default {
    Query: {
        me: async (_, __, context) => {
            // Check if user is authenticated.
            authCheck(context)
            
            // Find the user in database using their id.
            const user = await User.findById(context.user.id)

            // If user not found, throw an error.
            if (!user) {
                throw new GraphQLError("User not found")
            }

            return user
        },
        getUserByEmail: async (_, { email }) => {          
            // Find the user in database using their email.
            const user = await User.findOne({email})
            return user
        },
    }, 
    Mutation: {
        signup: async (_, { input }, context) => {
            const { userName, email, password } = input

            try {
                const normalEmail = email.toLowerCase()

                // Check if email already exists.
                const existUser = await User.findOne({ email: normalEmail })

                // If user exists, throw an error.
                if (existUser) {
                    throw new GraphQLError("user already exists.")
                }
                
                // Hash the password using bcryptjs.
                const hashedPassword = await bcrypt.hash(password, 10)
                
                // Create a new user with the hashed password.
                const user = new User({
                    userName,
                    email,
                    password: hashedPassword,
                })
                
                // Save the user to the database.
                await user.save()
                
                // Generate a JWT token for the authenticated user.
                const token = generateToken(user._id)

                // Return the user and the JWT token.
                return { user, token }

            } catch (error) {
                throw new GraphQLError(error.message);
            }
        },
        login: async (_, { input }) => {
            const { email, password } = input

            try {
                // Find the user by email.
                const user = await User.findOne({ email })
                
                // If user not found, throw an error.
                if (!user) {
                    throw new GraphQLError("User not found.")
                }
                
                // Compare the hashed password with the provided password.
                const isMatch = await bcrypt.compare(password, user.password)
                
                // If password does not match, throw an error.
                if (!isMatch) {
                    throw new GraphQLError("incorrect password.", {
                        extensions : {code: "INVALID_CREDENTIALS"}
                    })
                }
                
                // Generate a JWT token for the authenticated user.
                const token = generateToken(user._id)
                
                // Return the JWT token.
                return { user, token }

            } catch (error) {
                throw new GraphQLError(error.message, {
                    extensions: { code: "INTERNAL_SERVER_ERROR" }
                });
            }
        },
        oauthsignup: async (_, { input }) => {
            const { email, userName, provider } = input
            
            const userExist = await User.findOne({ email })

            if (userExist) {
                throw new GraphQLError('user with these credentials already exist')
            }

            // Create a new user with the hashed password.
            const user = new User({
                userName,
                email,
                provider
            })

            // Save the user to the database.
            await user.save()

            const token = generateToken(user._id)

            return { user, token }
        },
    }
}