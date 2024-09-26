const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    condition: {
        type: Boolean,
    }
},
    {
        timestamps: true, 
    })

const userModel = mongoose.model("users", userSchema);

module.exports = userModel