// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// You can also run a script with `npx hardhat run <script>`. If you do that, Hardhat
// will compile your contracts, add the Hardhat Runtime Environment's members to the
// global scope, and execute the script.
import hre from "hardhat";

import pkg from "hardhat";
const { ethers } = pkg;

const SocialMedia = await ethers.deployContract("SocialMedia");

await SocialMedia.waitForDeployment();

const PollContract = await ethers.deployContract("PollContract", [
  SocialMedia.target,
]);

await PollContract.waitForDeployment();

console.log("SocialMedia smart contract deployed to:", SocialMedia.target);

console.log("Poll smart contract deployed to:", PollContract.target);
