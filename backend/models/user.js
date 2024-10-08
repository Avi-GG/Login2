const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1:27017/data1");

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true, // Enforces unique usernames
    },
    password: {
        type: String,
        required: true,
    },
    
});

module.exports =  mongoose.model('user', userSchema);