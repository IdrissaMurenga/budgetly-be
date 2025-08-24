export const transactionType = `
    type Transaction {
        id:ID!
        user: User!
        amount: Float!
        description: String
        transactionType: String
    }
    type Query {
        transactions: [Transaction]!
        transaction(id: ID!): Transaction
    }
    type Mutation {
        addTransaction(input: AddTransactionInput) : Transaction!
        updateTransaction(id: ID!, input: UpdateTransactionInput) : Transaction!
        deleteTransaction(id: ID!) : Boolean
    }
    input AddTransactionInput {
        amount: Float!
        description: String!
        transactionType: String!
    }
    input UpdateTransactionInput {
        amount: Float
        description: String
    }

`