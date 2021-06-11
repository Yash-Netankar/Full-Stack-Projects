const express = require("express");
const cors = require("cors");
const app = express();
require('dotenv').config();

const mongoose = require("mongoose");

const DB = process.env.DB;
const PORT = process.env.PORT || 3001;

// connecting database
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).
    then(() => console.log("DB connected")).
    catch(err => console.log(err));

// using middlewares and routers and more
app.use(cors());
app.use(express.json());

const movieRoutes = require("./Routes/Movies");
app.use('/movie', movieRoutes);


app.listen(PORT, () => console.log("Listening"));