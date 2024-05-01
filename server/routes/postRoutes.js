const express = require("express");
const router = express.Router();

router.post("/createPost", async (req, res) => {
  const { content, mediaHash } = req.body;

  const tx = await contract.createPost(content, mediaHash);
  await tx.wait();

  res.json({ message: "Post created" });
});

router.get("/getPost/:postId", async (req, res) => {
  const { postId } = req.params;

  const post = await contract.getPost(postId);
  res.json(post);
});

router.get("/getPosts/:address", async (req, res) => {
  const { address } = req.params;

  const posts = await contract.getUserPosts(address);
  res.json(posts);
});

// Likes

router.post("/like", async (req, res) => {
  const { postId } = req.body;

  const tx = await contract.likePost(postId);
  await tx.wait();

  res.json({ message: "Post liked" });
});

router.post("/unlike", async (req, res) => {
  const { postId } = req.body;

  const tx = await contract.unlikePost(postId);
  await tx.wait();

  res.json({ message: "Post unliked" });
});

// Comments

router.post("/comment", async (req, res) => {
  const { postId, content } = req.body;

  const tx = await contract.commentOnPost(postId, content);
  await tx.wait();

  res.json({ message: "Comment created" });
});

router.get("/getComments/:postId", async (req, res) => {
  const { postId } = req.params;

  const comments = await contract.getPostComments(postId);
  res.json(comments);
});

module.exports = router;
