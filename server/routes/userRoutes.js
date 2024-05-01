const express = require("express");
const router = express.Router();

router.post("/createUser", async (req, res) => {
  const { username, bio, profilePictureHash } = req.body;

  const tx = await contract.createUser(username, bio, profilePictureHash);
  await tx.wait();

  res.json({ message: "User created" });
});

// Follow Routes

router.post("/follow", async (req, res) => {
  const { user } = req.body;

  const tx = await contract.followUser(user);
  await tx.wait();

  res.json({ message: "User followed" });
});

router.post("/unfollow", async (req, res) => {
  const { user } = req.body;

  const tx = await contract.unfollowUser(user);
  await tx.wait();

  res.json({ message: "User unfollowed" });
});

router.get("/getFollowers/:address", async (req, res) => {
  const { address } = req.params;

  const followers = await contract.getFollowers(address);
  res.json(followers);
});

module.exports = router;
