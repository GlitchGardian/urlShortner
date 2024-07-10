const express = require('express')
const router = express.Router();
const { createShorturl, getWebsiteBySurl, deleteShortid } = require('../controller/urlshortner');



// Endpoint to create a new shortened URL
router.post('/shorten', createShorturl());

// Endpoint to get the original URL by shortId
router.route("/owe/:shortId")
    .get(getWebsiteBySurl())
    .delete(deleteShortid())


module.exports = router 