const express = require("express");
const router = express.Router();

const Post = require("../models/post");

// get all posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.all;
    res.json({ posts });
  } catch (err) {
    res.status(500).json({ err });
  }
});

// get post by id
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(parseInt(req.params.id));
    if (id !== req.params.id) res.redirect("/");
    res.json(post);
  } catch (err) {
    res.status(404).json({ err });
  }
});

// create post
router.post("/", async (req, res) => {
  try {
    const post = await Post.create(
      req.body.title,
      req.body.name,
      req.body.message
    );
    // res.json(post);
    res.status(201);
  } catch (err) {
    res.status(404).json({ err });
  }
});

module.exports = router;
