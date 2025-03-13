import { user_data } from "../utils/mongo.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { getJson } from "serpapi";

const hashPassword = async (password) => {
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        console.log("Hashed Password:", hashedPassword);
        return hashedPassword;
    } catch (error) {
        console.error("Error hashing password:", error);
        throw error; 
    }
};


export const signup = async (req, res) => {
    try {
        console.log(req.body)
        const user_find = await user_data.exists({ "username": req.body.username });
        if (user_find) {
            return res.status(201).send("Username Already Exists!");
        }

        const hash = await hashPassword(req.body.password.trim());
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
        console.log(isMatch);
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

    if (password.length < 8 || password.length > 30) return res.status(400).send("Invalid Password Length");
    if (!/[a-z]/.test(password)) return res.status(400).send("Missing Lowercase Characters in Password");
    if (!/[A-Z]/.test(password)) return res.status(400).send("Missing Uppercase Characters in Password");
    if (!/\d/.test(password)) return res.status(400).send("Missing Numeric Characters in Password");
    if (!/[-!@#$%^&*(),.?":{}<~\/\\[\]]/.test(password)) return res.status(400).send("Missing Special Characters");
    if (/\s/.test(password)) return res.status(400).send("Invalid Characters in Password");
    if (!/^[a-zA-Z0-9!@#$%^&*(),.+-=?":{}<~\/\\[\]]+$/.test(password)) {
        return res.status(400).send("Invalid Characters in Password");
    }

    const username_regex = /^[a-z0-9]*_?[a-z0-9]*$/;
    if (!username_regex.test(username)) {
        return res.status(400).send("Invalid Username Pattern");
    }
    if (username.length < 4 || username.length > 30) {
        return res.status(400).send("Invalid Username Length");
    }

    const user_find = await user_data.exists({ username });
    if (user_find) {
        return res.status(400).json("Username already exists");
    }

    return res.sendStatus(200);
};

export const getverifytoken = (req, res) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(201).json({ message: "No token found" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET); 
        console.log(decoded);
        return res.status(200).json({ token: decoded });
    } catch (error) {
        console.error("Token verification error:", error);

        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(403).json({ message: "Token expired" });
        } else {
            return res.status(500).json({ message: "Internal server error" });
        }
    }
};

export const getnews = async (req, res) => {
    try {
        const news = await new Promise((resolve, reject) => {
            getJson({
                api_key: process.env.SERP_API,
                engine: "google",
                q: "stock market news",
                location: "United States",
                google_domain: "google.com",
                gl: "us",
                hl: "en"
            }, (json) => {
                if (json) resolve(json);
                else reject("No news data found.");
            });
        });

        return res.status(200).json({ message: news });
    } catch (error) {
        console.error("Error fetching news:", error);
        return res.status(500).json({ error: "Failed to fetch news" });
    }
};

export const clear=(req,res)=>{
    res.clearCookie("token", { path: "/" });
    res.status(200).json({ message: "Logged out successfully" });
}