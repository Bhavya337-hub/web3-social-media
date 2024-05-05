// UserProfile.js
import React, { useState, useEffect } from "react";
import "./UserProfile.css"; // Import CSS file

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { useSocialMedia } from "../../Context/SocialMediaContext";
import { Link } from "react-router-dom";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [followers, setFollowers] = useState([]);
  const [following, setFollowing] = useState([]);
  const [showFollowers, setShowFollowers] = useState(true);
  const [showFollowing, setShowFollowing] = useState(false);

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

  const handleToggleFollowers = () => {
    setShowFollowers(true);
    setShowFollowing(false);
  };

  const handleToggleFollowing = () => {
    setShowFollowing(true);
    setShowFollowers(false);
  };

  const handleUnfollow = async (username) => {};

  return (
    <>
      <div className="profile">
        <div className="profile-header">
          <div className="profile-image">
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
            <span>Posts</span>
          </div>
          <div className="stat" onClick={handleToggleFollowers}>
            <span>{user && parseInt(user.followers)}</span>
            <span>Followers</span>
          </div>
          <div className="stat" onClick={handleToggleFollowing}>
            <span>{user && parseInt(user.following)}</span>
            <span>Following</span>
          </div>
        </div>

        {/* Followers list */}
        {showFollowers && (
          <div className="followers">
            <h3>Followers</h3>
            <div className="followers-list">
              {followers.map((follower, index) => (
                <div
                  key={index}
                  className="follower d-flex justify-content-center align-items-center"
                >
                  <img
                    src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                      follower.profilePictureHash
                    }`}
                    style={{
                      width: "50px",
                      height: "50px",
                      marginRight: "10px",
                    }}
                    alt="Follower"
                  />
                  <span>{follower.username}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Following list */}
        {showFollowing && (
          <div className="following">
            <h3>Following</h3>
            <div className="following-list">
              {following.map((followedUser, index) => (
                <div
                  key={index}
                  className="followed-user d-flex align-items-center justify-content-between"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                        followedUser.profilePictureHash
                      }`}
                      style={{
                        width: "50px",
                        height: "50px",
                        marginRight: "10px",
                      }}
                      alt="Following"
                    />
                    <span>{followedUser.username}</span>
                  </div>
                  <button
                    className="mx-5"
                    onClick={() => handleUnfollow(followedUser.username)}
                  >
                    Unfollow
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
        <div>
          <Link to="/" className="btn btn-primary back-btn my-4">
            Return to Home Page
          </Link>
        </div>
      </div>
    </>
  );
};

export default UserProfile;
