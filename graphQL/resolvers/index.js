import userResolver from "./userResolver.js";
import transactionResolver from "./transactionResolver.js";
import categoryResolver from "./categoryResolver.js";

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...transactionResolver.Query,
        ...categoryResolver.Query
    },
    User: userResolver.User,
    Transaction: transactionResolver.Transaction,
    Mutation: {
        ...userResolver.Mutation,
        ...transactionResolver.Mutation
    }
}