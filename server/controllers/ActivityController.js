import { user_data } from "../utils/mongo.js";
import { getJson } from "serpapi";

export const getnews = async (req, res) => {
    try {
        const news = await new Promise((resolve, reject) => {
            getJson({
                api_key: process.env.SERP_API,
                engine: "google",
                q: "american stock market",
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

export const mainstock = async (req, res) => {
    try {
        console.log("username is " +req.body.username)
        const user_mainstock = await user_data.findOne({ "username": req.body.username });
        console.log(user_mainstock)
        return res.status(200).json({ message: user_mainstock.mainstock});
    } catch (e) {
        console.log(e);
    }
};

export const upload_data = async (req, res) => {
    try {
        console.log(req.body.username)
        const updatedStock = await user_data.findOneAndUpdate(
            { "username": req.body.username },      // Search condition
            { $set: { investments: req.body.investments } }             // Return updated document and create if not exists
        );
        return res.status(200).json({ message: "done"});
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const get_data = async (req, res) => {
    try {
        console.log(req.body)
        const userStockData = await user_data.findOne({ "username": req.body.username});

        if (!userStockData) {
            return res.status(404).json({ error: "User data not found" });
        }

        return res.status(200).json({ investments: userStockData.investments });
    } catch (e) {
        console.error(e);
        return res.status(500).json({ error: "Internal server error" });
    }
};

export const edit_account = async (req, res) => {
    console.log(req.body)
    const { username, action, newName } = req.body;

    try {
        const user = await user_data.findOne({ username });

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        if (action === 'change_name') {
            if (!newName) {
                return res.status(400).json({ error: "New name is required to change name." });
            }
            user.full_name = newName;
            await user.save();
            return res.status(200).json({ message: "Name updated successfully." });
        }

        if (action === 'delete_data') {
            user.investments = [];
            await user.save();
            return res.status(200).json({ message: "All data deleted successfully." });
        }

        if (action === 'delete_account') {
            await user_data.deleteOne({ username });
            return res.status(200).json({ message: "Account deleted successfully." });
        }

        return res.status(400).json({ error: "Invalid action specified." });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error." });
    }
};