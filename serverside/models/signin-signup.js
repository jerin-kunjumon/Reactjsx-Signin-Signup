const mongoose = require('mongoose');
const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Name is required"]
    }, 
    email: {
        type: String,
        required: [true, "Email is required"]
    }, 
    password: {
        type: String,
        required: [true, "Password is required"]
    }
})

const UserModel = mongoose.model("signin signup form", UserSchema)
module.exports = UserModel