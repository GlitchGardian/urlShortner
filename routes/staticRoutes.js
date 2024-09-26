const express = require('express')
const { route } = require('./ShortUrlRoutes')
const router = express.Router()

router.get("/signup", (req, res) => {
    res.render("signup")
})

router.get("/login", (req, res) => {
    res.render("login")
})

router.get("/short", (req, res) => {
    res.render("shortner")
})

module.exports = router

