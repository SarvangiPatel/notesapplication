const MyModel = require("../models/user.models");
const bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config()
const cookieParser = require('cookie-parser');


const usercontroller = {
    test: async (req, res) => {
        try {
            console.log("User controller test endpoint hit");
            res.status(200).json({ message: "User controller test successful" });
        } catch (error) {
            res.status(500).json({ error: "An error occurred" });
        }
    },
    register: async (req, res) => {
    const { name, email, password } = req.body;

    console.log("Registering user with data:", req.body);

    if (!name || !email || !password) {
        return res.status(400).json({ error: "All fields are required" });
    }

    try {
        const isexistuser = await MyModel.findOne({ email });
        if (isexistuser) {
            return res.status(400).json({ error: "User already exists" });
        }

        const hasepassword = await bcrypt.hash(password, 10);
        const newUser = await MyModel.create({ ...req.body, password: hasepassword });

        console.log("New user created:", newUser);
        res.status(201).json({ message: "User registered successfully", user: newUser });

    } catch (error) {
        console.error("User creation error:", error);
        res.status(500).json({ error: "An error occurred during user creation" });
    }
},

    signin: async (req, res) => {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(400).json({ error: "Email and password are required" });
        }

        try {
            const user = await MyModel.findOne({ email });
            if (!user) {
                return res.status(404).json({ error: "User not found" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json({ error: "Invalid credentials" });
            }

            // Exclude password
            const userData = { ...user._doc };
            delete userData.password;

            // Generate JWT
            try {
                const token = jwt.sign({ userData }, process.env.PRIVATE_KEY);
                res.cookie("ACCESS_TOKEN", token);
                console.log("User signed in successfully, token generated");
                return res.status(200).json({ message: "User signed in successfully", user: userData, token });
            } catch (error) {
                console.error("Error during token generation:", error);
                return res.status(500).json({ error: "Token generation failed" });
            }
        } catch (error) {
            console.error("Error during sign-in:", error);
            return res.status(500).json({ error: "An error occurred during sign-in" });
        }
    }

}


module.exports = usercontroller;