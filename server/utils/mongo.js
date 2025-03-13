import mongoose from 'mongoose'
export const user_schema = new mongoose.Schema({
    username: String, //change username & visible
    password: String, //change password
    role: String, //hide
    full_name: String, //show
    investments: Array, //hide
    email:String, //show
    mainstock: { type: String, default: "AAPL" }
});
export const user_data = mongoose.model('User', user_schema);