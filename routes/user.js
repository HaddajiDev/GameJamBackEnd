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
        res.send({msg: "user Added", id: newUser.id});
    } catch (error) {
        res.send({msg: "username taken (just like your crush)"});
        console.log(error);
    }
});

router.put('/', async (req, res) => {
    const id = req.query.id;
    const score = req.query.score;
    
    try {
        const user = await User.findByIdAndUpdate(
            id,
            { score: score },
            { new: true }
        );

        if (user) {
            res.send({ message: "User score updated successfully", user });
        } else {
            res.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: "Error updating user score" });
    }
});


router.get('/playerScore', async(req, res) => {
    const id = req.query.id;
    try {
        const user = await User.findById(id);
        res.send({score: user.score, username: user.username});
    } catch (error) {
        
    }
})


router.get('/', async(req, res) => {
    try {
        const topUsers = await User.find().sort({score: -1}).limit(10);
        res.send({users: topUsers});
    } catch (error) {
        
    }
})


module.exports = router;