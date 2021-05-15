const express = require("express");
const app = express();
const cors = require("cors");

const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// getting all models (schemas created)
const db = require("./models/index");

// IMPORTING ROUTES...
// 1].registration route
const userRoutes = require("./Routes/Users");
app.use('/user', userRoutes);

// 2].login route
const loginRoute = require("./Routes/Login");
app.use('/login', loginRoute);


// running app when database is connected
db.sequelize.sync().then(req => {
    app.listen(PORT, () => console.log("Listening to ", PORT))
})