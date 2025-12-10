const {Router} = require("express");
const { CourseModel, PurchaseModel} = require("../db");
const courseRouter = Router();

courseRouter.get('/preview', async (req, res) => {
    const courses = await CourseModel.find();
    res.send(courses);
});
courseRouter.post('purchase', async (req,res) => {
    const userId = req.userId;
    const courseId = req.courseId;
    await PurchaseModel.create({
        courseId : courseId,
        userId : userId
    });
    res.send('Purchase this course');
});

module.exports = {
    courseRouter : courseRouter
};