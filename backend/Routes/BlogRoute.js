const { createData, fetchData, UpdateBlogById, DeleteBlogById } = require("../Controller/BlogController");

const router = require("express").Router();

router.post("/", createData);

router.get("/", fetchData);

router.put("/:id", UpdateBlogById);

router.delete("/:id", DeleteBlogById);

module.exports = router;