const express = require('express');
const app = express();
const { ConnectToMongo } = require('./connection/mongoConnect');
const routehandler = require('./routes/routes')
const url = "mongodb://localhost:27017/urlShortner"
const port = 8000;

// Middleware to parse JSON requests
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Connect to MongoDB

ConnectToMongo(url)
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log(error);
    })

app.use("/", routehandler)

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
