const express = require("express");
const router = express.Router();

const movie = require("../models/movies");


router.get("/", async (req, res) => {
    const data = await movie.find();
    res.send(data);
});

// to get movie data in feilds while updating a particular movie
router.get("/:id", async (req, res) => {
    const id = req.params.id;
    const data = await movie.findOne({ _id: id });
    res.send(data);
});

router.post("/add", async (req, res) => {
    const data = req.body;
    await movie.create(data);
    res.send("Movie Successfully Added");
});

router.put("/update", async (req, res) => {
    const data = req.body;
    await movie.findOneAndUpdate({ _id: data._id }, {
        mname: data.mname,
        mlanguage: data.mlanguage,
        mrelease: data.mrelease,
        mbudget: data.mbudget,
        mcollection: data.mcollection
    })
    res.send("Movie Successfully Updated");
});

router.delete("/delete/:id", async (req, res) => {
    const id = req.params.id;
    await movie.findByIdAndDelete({ _id: id });

    // new set of movies
    const data = await movie.find();
    res.send(data);
});


module.exports = router;