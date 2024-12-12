const User = require("../database/models/User.js");
const bcrypt = require("bcrypt");
var jwt = require('jsonwebtoken');
var dotenv = require('dotenv')
dotenv.config()

module.exports = {
    async register(req, res) {
        const { login, email, password } = req.body;
        const role = false

        try {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.status(400).json({
                    status: 400,
                    message: "User already exists",
                });
            }

            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password, saltRounds);

            const user = new User({
                login,
                email,
                password: hashedPassword,
                role
            });

            await user.save();

            res.status(200).json({
                status: 200,
                message: "User registered successfully",
            });
        } catch (err) {
            res.status(400).json({
                status: 400,
                message: err.message.toString(),
            });
        }
    },
    async login(req, res) {
        const { login, password } = req.body;

        try {
            const user = await User.findOne({ login });
            if (!user) {
                return res.status(400).json({
                    status: 400,
                    message: "User not found",
                });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({
                    status: 400,
                    message: "Invalid password",
                });
            }

            const accessToken = jwt.sign(
                {
                    login: user?.login,
                    email: user?.email,
                    role: user?.role
                },
                process.env.TOKEN_SECRET,
                { expiresIn: '1h' }
            )
            res.cookie('JWT', accessToken, {
                maxAge: 600,
                secure: false,
                httpOnly: true
            })

            res.status(200).json({
                status: 200,
                message: "Login successful",
                accessToken: accessToken,
            });
        } catch (err) {
            res.status(500).json({
                status: 500,
                message: err.message.toString(),
            });
        }
    }
};
