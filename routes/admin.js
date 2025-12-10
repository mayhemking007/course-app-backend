const {Router} = require("express");
const { AdminModel, CourseModel } = require("../db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const express = require("express");
const { adminMiddleware } = require("../middleware/admin");

const adminRouter = Router();
adminRouter.use(express.json());
dotenv.config();


adminRouter.post('/signup', async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const encryptPass = await bcrypt.hash(password, 5);
    await AdminModel.create({
        email : email,
        password : encryptPass,
        firstName : firstName,
        lastName : lastName
    });
    console.log(encryptPass);
    res.send('admin signed up!');
});
adminRouter.post('/signin', async (req,res) => {
    const email = req.body.email;
    const password = req.body.password;
    const user = await AdminModel.findOne({
        email : email
    });
    const decodedPass = await bcrypt.compare(password, user.password);
    if(decodedPass && user){
        const token = jwt.sign({
            userId : user._id.toString()
        }, process.env.JWT_SECRET_ADMIN);
        res.json({
            token : token
        })
        console.log("You are logged in!");
    }
    else{
        res.status(403).send("Incorrect credentials");
    }
});
adminRouter.use(adminMiddleware);

adminRouter.post('/course', async (req, res) => {
    const title = req.body.title;
    const description = req.body.description;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const creatorId = req.userId;
    const course = await CourseModel.create({
        title,
        description,
        price,
        imageUrl,
        creatorId
    });

    res.send('New course added');
});
adminRouter.delete('/course', async (req, res) => {
    const courseId = req.body.courseId;
    await CourseModel.deleteOne({
        courseId : courseId,
        creatorId : req.userId
    });
    res.send('delete Courses');
});
adminRouter.put('/course' , async (req, res) => {
    const {title, description, imageUrl, price, courseId} = req.body;
    await CourseModel.updateOne({
        courseId : courseId,
        creatorId : req.userId
    }, {
        title : title,
        description : description,
        price : price,
        imageUrl : imageUrl
    });
    res.send('create-Courses');
});

adminRouter.get('/courses' , async (req, res) => {
    const course = await CourseModel.find({
        creatorId : req.userId
    });
    res.send(course);
});

module.exports = {
    adminRouter : adminRouter
};