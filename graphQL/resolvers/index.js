import userResolver from "./userResolver.js";
import transactionResolver from "./transactionResolver.js";

export const resolvers = {
    Query: {
        ...userResolver.Query,
        ...transactionResolver.Query
    },
    Mutation: {
        ...userResolver.Mutation,
        ...transactionResolver.Mutation
    }
}