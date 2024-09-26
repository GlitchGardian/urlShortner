const bcrypt = require('bcrypt');
const users = require('../model/user');
const { v4: uuidv4 } = require('uuid');
const { setUser, getUser } = require("../extra/user")

function userSignup() {
    return async (req, res) => {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "All fields are required." });
            }

            const existingUser = await users.findOne({ email: email });
            if (existingUser) {
                return res.status(409).json({ error: "User already exists." });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            const createdUser = await users.create({
                name,
                email,
                password: hashedPassword,
            });

            // res.status(201).json({ message: "User created successfully", user: createdUser });
            if(createdUser)
            res.redirect("/gui/login")

        } catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
}

function UserLogin() {
    return async (req, res) => {

        try {
            const { email, password } = req.body;

            if (!email || !password) {
                return res.status(400).json({ error: "All fields are required." });
            }

            else {
                const user = await users.findOne({ email })

                if (!user) {
                    res.json({ error: "User is invalid You Have to Singup first" })
                }
                else {
                    const encpassword = user.password;
                    const match = await bcrypt.compare(password, encpassword)
                    if (!match) {
                        res.json({
                            msg: "Your Login credential is wrong"
                        })
                    }
                    else {
                        // res.json({
                        //     msg: "You Are logged in"
                        // })
                        const SessionId = uuidv4();
                        setUser(SessionId, user)
                        res.cookie("uuid", SessionId)
                        res.redirect("/gui/short")
                    }
                }
            }
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error." });
        }
    }
}

module.exports = { userSignup, UserLogin };
