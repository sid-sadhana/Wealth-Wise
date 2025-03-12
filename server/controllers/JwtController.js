import { user_data } from "../utils/mongo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const user_find = await user_data.exists({ "username": req.body.username });
        if (user_find) {
            return res.status(201).send("Username Already Exists!");
        }

        const saltRounds = 10; 
        const hash= await bcrypt.hash(req.body.password.trim(), saltRounds);
        console.log(hash)
        const make_user = new user_data({
            username: req.body.username,
            password: hash,
            role: "user",
            full_name: req.body.full_name,
            investments: []
        });

        await make_user.save();
        console.log("User saved successfully");
        return res.status(200).send("Registration Successful!");
    } catch (error) {
        console.error("Signup Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

export const signin = async (req, res) => {
    try {
        const user_find = await user_data.findOne({ "username": req.body.username });
        if (!user_find) {
            return res.status(401).json({ message: "Login failed" });
        }
        const isMatch = await bcrypt.compare(req.body.password.trim(), user_find.password);
        console.log("*"+user_find.password+"*");
        if (isMatch) {
            const token = jwt.sign(
                { username: req.body.username },
                process.env.JWT_SECRET,
                { expiresIn: '1h' }
            );

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
                path: '/',
                maxAge: 3600000 
            });

            return res.status(200).json({ message: "Login successful" });
        } else {
            return res.status(401).json({ message: "Login failed" });
        }
    } catch (error) {
        console.error("Signin Error:", error);
        return res.status(500).send("Internal Server Error");
    }
};

export const checkcred = async (req, res) => {
    const { username, password } = req.body;
    console.log("ochindi ccheck uername ki");

    // Password validation
    if (password.length < 8 || password.length > 30) return res.status(400).send("Invalid Password Length");
    if (!/[a-z]/.test(password)) return res.status(400).send("Missing Lowercase Characters in Password");
    if (!/[A-Z]/.test(password)) return res.status(400).send("Missing Uppercase Characters in Password");
    if (!/\d/.test(password)) return res.status(400).send("Missing Numeric Characters in Password");
    if (!/[-!@#$%^&*(),.?":{}<~\/\\[\]]/.test(password)) return res.status(400).send("Missing Special Characters");
    if (/\s/.test(password)) return res.status(400).send("Invalid Characters in Password");
    if (!/^[a-zA-Z0-9!@#$%^&*(),.+-=?":{}<~\/\\[\]]+$/.test(password)) {
        return res.status(400).send("Invalid Characters in Password");
    }

    // Username validation
    const username_regex = /^[a-z0-9]*_?[a-z0-9]*$/;
    if (!username_regex.test(username)) {
        return res.status(400).send("Invalid Username Pattern");
    }
    if (username.length < 4 || username.length > 30) {
        return res.status(400).send("Invalid Username Length");
    }

    // Check if username exists
    const user_find = await user_data.exists({ username });
    if (user_find) {
        return res.status(400).json("Username already exists");
    }

    return res.sendStatus(200);
};
