import { GraphQLError } from "graphql";
import Transactions from "../../db/models/transactionsModel.js"
import { authCheck } from './../../utils/authCheck.js';
export default {
    Query: {
        transactions: async (_, __, context) => {
            authCheck(context)
            try {                
                const transactions = await Transactions.find({ user: context.user.id })
                return transactions
            } catch (error) {
                throw new GraphQLError(`Error fetching transactions: ${error.message}`)
            }
        },
        transaction: async (_, { id }, context) => {
            authCheck(context)
            try {
                const transaction = await Transactions.findById({ _id: id, user: context.user.id })
                return transaction
            } catch (error) {
                throw new GraphQLError(`Error fetching a transaction: ${error.message}`)
            }
        }
    },
    Mutation: {
        addTransaction: async (_, { input }, context) => {
            const { amount, description, transactionType } = input
            authCheck(context)
            try {
                const newTransaction = new Transactions({
                    user: context.user.id,
                    amount,
                    description,
                    transactionType
                })
                console.log(newTransaction)
                return await newTransaction.save()
            } catch (error) {
                throw new GraphQLError(`Error adding transactions: ${error.message}`)
            }
        },
        updateTransaction: async (_, { id, input }, context) => {
            authCheck(context)
            try {
                const updateTransaction = await Transactions.findOneAndUpdate(
                    { _id: id, user: context.user.id },
                    { ...input },
                    { new: true, runValidators: true }
                )

                if (!updateTransaction) throw new GraphQLError('transaction not found')
                
                return updateTransaction
                
            } catch (error) {
                throw new GraphQLError(`Error updating transactions: ${error.message}`)
            }
        },
        deleteTransaction: async (_, { id }, context) => {
            authCheck(context)
            try {
                const deleteTransaction = await Transactions.findOneAndDelete({_id: id,user: context.user.id})
                if(!deleteTransaction) throw new GraphQLError(`transaction not found`)
                return true
            } catch (error) {
                throw new GraphQLError(`Error deleting transactions: ${error.message}`)
            }
        }
    }
}