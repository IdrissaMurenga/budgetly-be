export const transactionType = `
    enum TransactionType {
        expense
        income
        transfer
    }
    type Transaction {
        id:ID!
        user: User!
        amount: Float!
        description: String
        transactionType: TransactionType!
    }
    type Query {
        transactions: [Transaction]!
        transaction(id: ID!): Transaction
    }
    type Mutation {
        createTransaction(input: CreateTransactionInput) : Transaction!
        updateTransaction(id: ID!, input: UpdateTransactionInput) : Transaction!
        deleteTransaction(id: ID!) : Boolean
    }
    input CreateTransactionInput {
        amount: Float!
        description: String!
        transactionType: TransactionType!
    }
    input UpdateTransactionInput {
        amount: Float
        description: String
        transactionType: TransactionType
    }

`