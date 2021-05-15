const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs');
const SendMail = require("../mail");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// getting register model(schema created)
const { User } = require("../models");


// Routes
router.get("/:id", (req, res) => {
    const param = req.body;
    res.send(param)
})


//2]. creating a user and sending mail...
router.post("/", (req, res) => {
    const user = req.body;
    const pass = user.pass;
    bcrypt.genSalt(10, (err, salt) => {
        if (err) res.send({ msg: "Unknown Problem occured!" });
        else {
            // hashing passwords
            bcrypt.hash(pass, salt, async (err, hash) => {
                if (err) res.send({ msg: "Unknown Problem occured!" });
                else {
                    // check if duplicate user
                    const duplicate_user = await User.findAll({ where: { name: user.name } })

                    // try block to check duplicate email as its not working inside where query now so depending on database validations in User.js file

                    try {
                        if (duplicate_user === [] || duplicate_user.length < 1) {
                            // store in database if user don't exist
                            const register = await User.create({ name: user.name, email: user.email, pass: hash });
                            if (register && register !== null && register !== "") {
                                res.send({ msg: "Successfully Registered, kindly go to your gmail and activate account" });
                                // sending mail to activate account
                                SendMail("maimi.lgg7@gmail.com", user.email, user.name);
                            }
                        }
                        else res.send({ msg: "UserName Already Exists !!" })
                    }
                    catch {
                        res.send({ msg: "Email Already Exists !!" })
                    }
                }
            });
        }
    });
})


//3]. verifying and activating account...
router.post("/activateAccount", (req, res) => {
    jwt.verify(req.body.token, process.env.SECRET_TOKEN, (err, decoded) => {
        if (err) res.send({ msg: "Can't Verify You" });
        else {
            // changing varified account to true in DB
            User.update(
                { verifiedAcc: true },
                { where: { name: req.body.name } }
            )
            res.send({ msg: "Account successfully activated..thanks for becoming a member :)" })
        }
    })
})

module.exports = router;