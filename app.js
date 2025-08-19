import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { typeDefs } from './graphQL/types/index.js'
import { createYoga, createSchema } from 'graphql-yoga'
import { resolvers } from './graphQL/resolvers/index.js'
import { mongoDBConnect } from './db/connect/mongodb.js'
import { context } from './utils/context.js'

const app = express()

dotenv.config()

app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    methods: ['GET', 'POST', 'OPTIONS']
}))

const yoga = createYoga({
    schema: createSchema({
        typeDefs,
        resolvers
    }),
    context
})

app.use('/graphql', yoga)

mongoDBConnect(app)