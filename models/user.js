const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {type: String, unique: true},
    score: {type: Number}
});

module.exports = mongoose.model('User', userSchema);