const { Router } = require("express");
const { UserModel, PurchaseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const express = require("express");
const { userMiddleware } = require("../middleware/user");

const userRouter = Router();
userRouter.use(express.json());
dotenv.config();


userRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const lastName = req.body.lastName;
    const firstName = req.body.firstname;
    const encryptPass = await bcrypt.hash(password, 10);

    await UserModel.create({
        email : email,
        password : encryptPass,
        firstName : firstName,
        lastName : lastName,
    });

    res.send('You signed up!');
});
userRouter.post('/signin',  async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await UserModel.findOne({
        email : email
    })
    const decryptPass = await bcrypt.compare(password, user.password);
    if(decryptPass && user){
        const token = jwt.sign({
            userId : user._id.toString()
        }, process.env.JWT_SECRET);
        res.send(token);
    }
    res.send('You have signed in!');
});
userRouter.use(userMiddleware);
userRouter.get('/purchases', async (req, res) => {
    const userId = req.userId;
    const myCourses = await PurchaseModel.find({
        userId : userId
    }) 
    res.send(myCourses);
});

module.exports = {
    userRouter : userRouter
};