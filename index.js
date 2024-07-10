const express = require('express');
const mongoose = require('mongoose');
const shortid = require('shortid');

const app = express();
const port = 8000;

// Middleware to parse JSON requests
app.use(express.urlencoded({ extended: false }))
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/urlShortner')
    .then(() => {
        console.log("Connected");
    })
    .catch((err) => {
        console.log(err)
    })

// Define URL schema
const urlSchema = new mongoose.Schema({
    url: {
        type: String,
        require: true
    },
    shortid: {
        type: String,
        require: true,
        unique: true
    },
    count: {
        type: Number
    }
},
    { timestamps: true });

// Create URL model
const urls = mongoose.model('url', urlSchema);

// Endpoint to create a new shortened URL
app.post('/shorten', async (req, res) => {
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
});

// Endpoint to get the original URL by shortId
app.get('/owe/:shortId', async (req, res) => {

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

});


app.listen(port, () => console.log(`Example app listening on port ${port}!`));
