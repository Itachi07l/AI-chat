const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    email: { 
        type: String, required: true, unique: true 
    },
    fullname: {
        firstName: { type: String ,required: true},
        lastName: { type: String ,required: true},
    },
    password: { type: String },
},{ timestamps: true }
);

module.exports = mongoose.model("User", userSchema);