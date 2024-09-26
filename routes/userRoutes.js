const express = require("express");
const router = express.Router();
const { userSignup, UserLogin } = require("../controller/user")

router.post("/signUp", userSignup())
router.post("/login", UserLogin())

module.exports = router