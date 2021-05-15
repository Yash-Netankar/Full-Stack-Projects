const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

// getting register model(schema created)
const { User } = require("../models");

router.post("/user", async (req, res) => {
    const user = await User.findAll({ where: { name: req.body.name } }).
        then(responce => {
            // to get info as object (can't access res array directly) :(
            let data = { ...responce.map(i => i.dataValues) };
            data = data['0'];
            if (data) {
                // comparing passwords
                bcrypt.compare(req.body.pass, data.pass).
                    then(result => {
                        result === true ? res.send({ msg: true }) : res.send({ msg: false });
                    }).
                    catch(err => res.send({ msg: "Failed To Login Due To technical some error" }))
            }
            else {
                res.send({ msg: "User doesn't seem to Exist" });
            }
        }).catch(err => {
            res.send({ msg: "Failed To Login Due To some technical error" })
        });
})


module.exports = router;