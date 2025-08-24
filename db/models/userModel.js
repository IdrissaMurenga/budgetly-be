import mongoose from "mongoose";

const { Schema, model } = mongoose

const userSchema = new Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: function () { return !this.provider }
    },
    provider: {
        type: String,
        enum: ['google', 'github']
    }
}, { timestamps: true })

const User = model('User', userSchema)

export default User