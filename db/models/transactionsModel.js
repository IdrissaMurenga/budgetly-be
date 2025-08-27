import mongoose from "mongoose";

const { Schema, model } = mongoose;

const transactionsSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    transactionType: {
        type: String,
        required: true,
        enum: ['expense', 'income']
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    },
}, { timestamps: true })

const Transactions = model('transactions', transactionsSchema)

export default Transactions