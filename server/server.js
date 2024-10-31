const dotenv = require('dotenv');
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const argon2 = require('argon2');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

mongoose.connect(process.env.MONGODB_URI)
    .then(() => console.log('connected'))
    .catch(err => console.error('connection error:', err));

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
    exposedHeaders: ['Set-Cookie']
}));

app.use(express.json());
app.use(cookieParser()); 
const PORT = 5500;

const user_schema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    full_name: String,
    investments: Array,
});

const user_data = mongoose.model('User', user_schema);

app.get("/", (req, res) => {
    res.send("hello world");
});

app.post("/api/signup", async (req, res) => {
    const already_exists = await user_data.exists({ "username": req.body.username });
    if (!already_exists) {
        const hash = await argon2.hash(req.body.password);
        const user_data_feed = new user_data({
            "username": req.body.username,
            "password": hash,
            "full_name": "",
            "role": "user",
            "investments": [],
        });
        await user_data_feed.save();
        console.log("user registered");
        res.status(201).json({ message: "user registered" });
    } else {
        console.log("user already exists");
        res.status(409).json({ message: "user already exists" });
    }
});

app.post("/api/signin", async (req, res) => {
    const user_find = await user_data.findOne({ "username": req.body.username });
    if (user_find && await argon2.verify(user_find.password, req.body.password)) {
        const token = jwt.sign({ username: req.body.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.cookie('token', token, {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
            path: '/',
            maxAge: 3600000
        });
        res.status(200).json({ message: "login successful" });
    } else {
        res.status(401).json({ message: "login failed" });
    }
});

app.get("/api/get-verify-token",(req,res)=>{
    const token = req.cookies.token
    if (token) {
        if(jwt.verify(token,process.env.JWT_SECRET)){
            res.status(200)
        }
        else res.status(202)
    } else {
        res.status(201).json({ message: "no token found" });
    }
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});