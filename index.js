const express = require("express");
const { userRouter } = require("./routes/user");
const { courseRouter } = require("./routes/courses");
const { adminRouter } = require("./routes/admin");
const mongoose = require("mongoose");
const dotenv = require("dotenv");


dotenv.config();
const app = express();

app.use(express.json());
app.use('/user', userRouter);
app.use("/courses", courseRouter);
app.use("/admin", adminRouter);

app.get('/', (req, res) => {
    res.send("Homepage");
})

async function main(){
    await mongoose.connect(process.env.MONGODB_URL);
    app.listen(3000);
}

main();

