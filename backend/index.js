require("dotenv").config();
const express = require('express');
const app = express();
const BlogRouter = require("./Routes/BlogRoute");
const UserRouter = require("./Routes/UserRoute");
const PORT  = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());

require("./Models/db")

app.use(express.json());

app.get("/", (req,res) => {
    res.send("Hello World");
})

app.use("/blog", BlogRouter);
app.use("/user", UserRouter);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

