const express = require('express');
const app = express();
const path = require('path')
const cookieparser = require('cookie-parser')
const { ConnectToMongo } = require('./connection/mongoConnect');
const ShortUrlRouteHandler = require('./routes/ShortUrlRoutes')
const userRouteHandler = require('./routes/userRoutes')
const staticRouteHandler = require('./routes/staticRoutes')
const { restrictUsers } = require("./middlewares/userAuth")
const url = "mongodb://localhost:27017/urlShortner"
const port = 3000;
app.use(cookieparser())
//Middleware to parse formdata
app.use(express.urlencoded({ extended: false }))
// Middleware to parse JSON requests
app.use(express.json());
app.use(express.static(path.resolve(__dirname, 'public')))
app.set('view engine', 'ejs')

// Connect to MongoDB

ConnectToMongo(url)
    .then(() => {
        console.log("Connected");
    })
    .catch(() => {
        console.log(error);
    })

app.use("/user", userRouteHandler)
app.use("/gui", staticRouteHandler)
app.use("/", restrictUsers, ShortUrlRouteHandler)


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
