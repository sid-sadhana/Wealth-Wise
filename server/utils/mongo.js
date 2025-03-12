import mongoose from 'mongoose'
export const user_schema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    full_name: String,
    investments: Array,
});

export const user_data = mongoose.model('User', user_schema);
