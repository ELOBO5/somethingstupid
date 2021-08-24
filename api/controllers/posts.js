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

// get posts maching query
router.get("/:query", async (req, res) => {
  try {
    const posts = await Post.findByQuery(req.params.query);
    console.log(posts);
    res.status(200).json(posts);
  } catch (err) {
    res.status(404).json({ err });
  }
});

// create post
router.post("/", async (req, res) => {
  console.log(req.body);
  try {
    const post = await Post.create(
      req.body.title,
      req.body.name,
      req.body.message
    );
    // res.json(post);
    res.status(201).json(post);
  } catch (err) {
    res.status(404).json({ err });
  }
});

module.exports = router;
