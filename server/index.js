const ethers = require('ethers');

require('dotenv').config();

const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;
const CONTRACT_ADDRESS = process.env.CONTRACT_ADDRESS;

const provider = new ethers.providers.JsonRpcProvider(API_URL);
const signer = new ethers.Wallet(PRIVATE_KEY, provider);
const { abi } = require('./artifacts/contracts/SocialMedia.sol/SocialMedia.json');
const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);

const express = require('express');
const app = express();

const cors = require('cors');
app.use(cors());
app.use(express.json());

app.post("/createUser", async (req, res) => {
    const { username, bio, profilePictureHash } = req.body;

    const tx = await contract.createUser(username, bio, profilePictureHash);
    await tx.wait();

    res.json({ message: "User created" });
});

app.post("/createPost", async (req, res) => {
    const { content, mediaHash } = req.body;

    const tx = await contract.createPost(content, mediaHash);
    await tx.wait();

    res.json({ message: "Post created" });
});

app.post("/likePost", async (req, res) => {
    const { postId } = req.body;

    const tx = await contract.likePost(postId);
    await tx.wait();

    res.json({ message: "Post liked" });
});

app.post("/unlikePost", async (req, res) => {
    const { postId } = req.body;

    const tx = await contract.unlikePost(postId);
    await tx.wait();

    res.json({ message: "Post unliked" });
});

app.post("/commentOnPost", async (req, res) => {
    const { postId, content } = req.body;

    const tx = await contract.commentOnPost(postId, content);
    await tx.wait();

    res.json({ message: "Comment created" });
});

app.get("/getPost/:postId", async (req, res) => {
    const { postId } = req.params;

    const post = await contract.getPost(postId);
    res.json(post);
});

app.get("/getUserPosts/:address", async (req, res) => {
    const { address } = req.params;

    const posts = await contract.getUserPosts(address);
    res.json(posts);
});

app.get("/getPostComments/:postId", async (req, res) => {
    const { postId } = req.params;

    const comments = await contract.getPostComments(postId);
    res.json(comments);
});

app.post("/followUser", async (req, res) => {
    const { user } = req.body;

    const tx = await contract.followUser(user);
    await tx.wait();

    res.json({ message: "User followed" });
});

app.post("/unfollowUser", async (req, res) => {
    const { user } = req.body;

    const tx = await contract.unfollowUser(user);
    await tx.wait();

    res.json({ message: "User unfollowed" });
});

app.get("/getFollowers/:address", async (req, res) => {
    const { address } = req.params;

    const followers = await contract.getFollowers(address);
    res.json(followers);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});