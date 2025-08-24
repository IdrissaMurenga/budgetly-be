import { userType } from "./userType.js";
import { transactionType } from "./transactionsType.js";

export const typeDefs = `
    ${userType}
    ${transactionType}
`