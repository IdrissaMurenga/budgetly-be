export const userType = `
    type User {
        id: ID!
        userName: String!
        email: String!
        provider: String!
        transactions: [Transaction]
    }
    type Query {
        me: User
        getUserByEmail(email: String!): User
    }
    type AuthPayload {
        user: User
        token: String!
    }
    type Mutation {
        signup(input: SignupInput) : AuthPayload!
        login(input: LoginInput) : AuthPayload!
        oauthsignup(input: OAuthInput): AuthPayload!
    }
    input SignupInput {
        userName: String!
        email: String!
        password: String!
    }
    input OAuthInput {
        userName: String!
        email: String!
        provider: String!
    }
    input LoginInput {
        email: String!
        password: String!
    }
`