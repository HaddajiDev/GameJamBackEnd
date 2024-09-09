const express = require("express");
const app = express();

const cors = require("cors");

require('dotenv').config();



const connect = require('./db_connect');
connect();

app.use(cors());

app.use('/user', require("./routes/user"));

app.get("/", (req, res) => res.send("Working"));


app.listen(process.env.PORT, () => {console.log("connected to " + process.env.PORT);})