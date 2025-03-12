import { user_data } from "../utils/mongo.js";
import argon2 from "argon2";
import jwt from "jsonwebtoken";

export const signup = async (req, res) => {
    try {
        const user_find = await user_data.exists({ "username": req.body.username });
        if (user_find) {
            return res.status(201).send("Username Already Exists!");
        }

        const hash = await argon2.hash(req.body.password);
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
        if (user_find && await argon2.verify(user_find.password, req.body.password)) {
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
