
Web3 Social Media Platform

Project Overview:
This project aims to develop a decentralized social media platform leveraging Web3 technologies. Users can interact with each other through posts, comments, likes, and polls. The platform ensures privacy, security, and transparency by storing data on the Ethereum blockchain and utilizing off-chain storage via IPFS.

Team Members:

Utsav Raithatha
Bhavya Khakhar
Hardagana Mehta
Vishal Sharma

Project Structure:

Smart Contracts: Solidity smart contracts manage user profiles, posts, comments, likes, and polls on the Ethereum blockchain.
Off-chain Storage: IPFS via Pinata is used to store media files related to posts and user profiles.
Blockchain Network: Sepolia Test Network is utilized for smart contract deployment and testing.
List of Smart Contracts Developed:

User, Post, Comment, and Poll structs define the data structures.
Functions like createUser, createPost, likePost, unlikePost, commentOnPost, followUser, unfollowUser, vote, etc., enable user interactions.
getPosts, getUserPosts, getPostComments, getFollowers, getPolls, and getVotes functions retrieve data from the blockchain.
Website Functionality:

Login Page: Authenticates users via MetaMask for decentralized and encrypted access.
Follow User: Allows users to follow others, ensuring authenticity and safety through MetaMask integration.
Commenting and Liking Posts: Users can interact with posts by commenting and liking, with transactions executed via MetaMask.
Follow/Unfollow Users: Enables users to follow or unfollow others, updating follower counts accordingly.
Creating and Voting on Polls: Facilitates decentralized decision-making through transparent and immutable polls recorded on the blockchain.
Design Artifacts:

Algorithms, flowcharts, sequence diagrams, and pseudo codes for smart contract development are provided.
Website functionality is detailed with explanations of MetaMask integration and transaction processing.
References:

Solidity Documentation: Link
Ethereum Proof-of-Stake (PoS): Link
Learn Solidity Handbook: Link
Note: Ensure MetaMask is installed to interact with the website and perform transactions on the blockchain.
