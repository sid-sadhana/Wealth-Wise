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

app.post("/api/check-username", async (req, res) => {
    const username = req.body.username;

    const username_regex = /^[a-z0-9]*_?[a-z0-9]*$/;

    if (!username_regex.test(username)) {
        return res.status(201).send("error_username_invalid");
    }
    if (username.length < 4 || username.length > 30) {
        return res.status(201).send("error_username_length");
    }
    const user_find = await user_data.exists({ "username": username });
    if (user_find === null) {
        return res.send(false);  
    } else {
        return res.send(true);  
    }
});

app.post("/api/check-password", async (req, res) => {
    const password = req.body.password;

    if (password === "") return res.status(201).send("error7");
    if (password.length < 8 || password.length>30) return res.status(201).send("error1");
    if (!/[a-z]/.test(password)) return res.status(201).send("error2");
    if (!/[A-Z]/.test(password)) return res.status(201).send("error3");
    if (!/\d/.test(password)) return res.status(201).send("error4");
    if (!/[-!@#$%^=+&*(),.?":{}<~\/\\\[\]]/.test(password)) return res.status(201).send("error5");
    if (/\s/.test(password)) return res.status(201).send("error6");

    if (!/^[a-zA-Z0-9!@#$%^&*(),.+-=?":{}<~\/\\\[\]]+$/.test(password)) {
        return res.status(201).send("error8");
    }

    return res.status(200).send("valid password");
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

app.get("/api/get-verify-token", (req, res) => {
    const token = req.cookies.token;
    if (token) {
        if (jwt.verify(token, process.env.JWT_SECRET)) {
            res.status(200);
        } else {
            res.status(202);
        }
    } else {
        res.status(201).json({ message: "no token found" });
    }
});

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
