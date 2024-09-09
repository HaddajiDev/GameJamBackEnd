const express = require("express");

const router = express.Router();

const User = require('../models/user');


router.post('/', async(req, res) => {
    const username = req.query.username;
    const score = req.query.score;
    try {
        const user = new User({
            username: username,
            score: score
        })

        const newUser = await user.save();
        res.send({user: newUser});
    } catch (error) {
        res.send({msg: "username taken (just like your crush)"});
        console.log(error);
    }
});

router.get('/', async(req, res) => {
    try {
        const topUsers = await User.find().sort({score: -1}).limit(10);
        res.send({users: topUsers});
    } catch (error) {
        
    }
})


module.exports = router;