// UserProfile.js
import React, { useState, useEffect } from "react";
import "./UserProfile.css"; // Import CSS file

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { useSocialMedia } from "../../Context/SocialMediaContext";

const UserProfile = () => {
  // Sample user data
  // const initialUser = {
  //   username: "example_username",
  //   profileName: "John Doe",
  //   bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  //   numberOfPosts: 20,
  //   followers: 1000,
  //   following: 500,
  // };

  // Sample posts data
  // const initialPosts = [
  //   { image: "post1.jpg", caption: "Post 1 caption" },
  //   { image: "post2.jpg", caption: "Post 2 caption" },
  //   // Add more posts as needed
  // ];

  // State variables
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);

  const { address } = useSocialMedia();

  useEffect(() => {
    getUser();
    getFollowers();
    getFollowing();
  }, []);

  const getUser = async () => {
    try {
      const data = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getUser",
        args: [address],
      });

      setUser(data);
    } catch (error) {
      console.log("Error while fetching user", error);
    }
  };

  const getFollowers = async () => {
    try {
      const data = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getFollowers",
        args: [address],
      });

      setFollowers(data);
    } catch (error) {
      console.log("Error while fetching user", error);
    }
  };

  const getFollowing = async () => {
    try {
      const data = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getFollowing",
        args: [address],
      });

      setFollowing(data);
      console.log(data);
    } catch (error) {
      console.log("Error while fetching user", error);
    }
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-image">
          {/* Add your profile image here */}
          <img
            src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
              user && user.profilePictureHash
            }`}
            alt="Profile"
          />
        </div>
        <div className="profile-info">
          <h2>{user && user.username}</h2>
          <span className="username">{user && user.bio}</span>
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span>{user && parseInt(user.posts.length)}</span>
          <span>posts</span>
        </div>
        <div className="stat">
          <span>{user && parseInt(user.followers)}</span>
          <span>followers</span>
        </div>
        <div className="stat">
          <span>{user && parseInt(user.following)}</span>
          <span>following</span>
        </div>
      </div>
      <div className="followers">
        <h3>Followers</h3>
        <div className="followers-list">
          {followers &&
            followers.map((follower, index) => {
              return (
                <div key={index} className="follower">
                  <img
                    src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                      follower.profilePictureHash
                    }`}
                    style={{ width: "50px", height: "50px" }}
                    alt="Follower"
                  />
                  <span>{follower.username}</span>
                </div>
              );
            })}
        </div>
      </div>
      <div className="following">
        <h3>Following</h3>
        <div className="following-list">
          {following &&
            following.map((follow, index) => {
              return (
                <div key={index} className="follow">
                  <img
                    src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                      follow.profilePictureHash
                    }`}
                    style={{ width: "50px", height: "50px" }}
                    alt="Following"
                  />
                  <span>{follow.username}</span>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
