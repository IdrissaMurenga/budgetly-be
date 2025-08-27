import { userType } from "./userType.js";
import { transactionType } from "./transactionsType.js";
import { categoryType } from "./categoryType.js";

export const typeDefs = `
    ${userType}
    ${transactionType}
    ${categoryType}
`