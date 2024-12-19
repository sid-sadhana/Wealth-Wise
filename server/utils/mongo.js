const mongoose = require('mongoose')
const user_schema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    full_name: String,
    investments: Array,
});

const user_data = mongoose.model('User', user_schema);
export {user_schema,user_data}