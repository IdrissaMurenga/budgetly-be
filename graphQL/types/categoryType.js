export const categoryType =`
    type Category {
        id: ID!
        user: User!
        name: String!
        icon: String!
        type: String!
    }
    input CategoryInput {
        name: String!
        type: String!
    }
    type Query {
        categories : [Category!]!
    }
`
