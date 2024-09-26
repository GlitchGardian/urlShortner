const { setUser, getUser } = require("../extra/user")

async function restrictUsers(req, res, next) {

    const sessionId = req.cookies?.uuid;
    // console.log(sessionId);

    if (!sessionId) {
        console.log("No session ID found, redirecting to login.");
        res.redirect("/gui/login")
    }

    const user = getUser(sessionId)

    if (!user) {
        console.log("User not found, redirecting to login.");
        return res.redirect("/gui/login");
    }

    req.user = user;
    console.log("User found:", user);
    next();
}

module.exports = {
    restrictUsers
}