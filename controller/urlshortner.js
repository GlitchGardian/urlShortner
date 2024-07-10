const urls = require('../model/urlshortner')
const shortid = require('shortid');

function createShorturl() {
    return async (req, res) => {
        try {
            const data = req.body;
            const originalUrl = data.url
            const shortId = shortid.generate();

            const ShortUrl = await urls.create({
                url: originalUrl,
                shortid: shortId,
                count: 1
            })

            res.status(201).json({ "ShortUrl is": `owe/${ShortUrl.shortid}` });
        } catch (error) {
            if (error.code === 11000) {
                res.status(400).json({ message: 'Duplicate shortId error' });
            } else {
                res.status(500).json({ message: 'Server error' });
            }
        }
    }
}

function getWebsiteBySurl() {
    return async (req, res) => {

        try {
            const shorturlid = req.params.shortId;

            const result = await urls.findOne({ shortid: shorturlid })
            const count = result.count + 1;

            const newRes = await urls.findOneAndUpdate({ shortid: shorturlid }, {
                count: count
            })

            if (newRes) {
                let redirectUrl = newRes.url;

                // Ensure the URL has a protocol
                if (!/^https?:\/\//i.test(redirectUrl)) {
                    redirectUrl = 'http://' + redirectUrl;
                }

                res.status(302).redirect(redirectUrl);
            } else {
                res.status(404).json({ error: "URL not found" });
            }
        } catch (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred while redirecting' });
        }

    }
}

function deleteShortid() {
    return async (req, res) => {
        const shortId = req.params.shortId
        const result = await urls.findOneAndDelete({ shortid: shortId })
        res.json(result)
    }
}

module.exports = {
    createShorturl,
    getWebsiteBySurl,
    deleteShortid
}