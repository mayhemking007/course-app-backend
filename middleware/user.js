const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const express = require("express");


userRouter.use(express.json());
dotenv.config();


const auth = async (req, res, next) => {
    const token = req.headers.token;
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    if(decodedToken){
        req.userId = decodedToken.userId;
        next();
    }
    else{
        res.status(403).send("You are verified");
    }

}

module.exports = {
    userMiddleware : auth
}