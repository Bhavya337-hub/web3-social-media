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

const routes = require('./routes/index');

app.use("/api", routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});