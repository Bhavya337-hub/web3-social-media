import React, { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import FollowList from "../../components/FollowList/FollowList";
import Welcome from "../Welcome/Welcome";
import ConnectButton from "../../components/ConnectButton";

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { useSocialMedia } from "../../Context/SocialMediaContext";

const Home = () => {
  const { address } = useSocialMedia();
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);

  if (!localStorage.getItem("isRegistered")) {
    return <Welcome />;
  }

  useEffect(() => {
    if (!localStorage.getItem("isRegistered")) {
      window.location.href = "/welcome";
    } else {
      getPosts();
    }
  }, [localStorage.getItem("isRegistered")]);

  const getPosts = async () => {
    try {
      const res = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getFollowingUsersPosts",
        account: address,
      });

      setPosts(res);

      for (let i = 0; i < res.length; i++) {
        const user = await readContract(config, {
          abi: SocialMediaABI,
          address: SocialMediaAddress,
          functionName: "getUser",
          args: [res[i].user],
        });

        setUsers((prev) => [...prev, user]);
      }
    } catch (error) {
      console.log("Error while fetching posts", error);
    }
  };

  return (
    <div className="Home">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Navbar />
          </div>
          <div className="col-md-6">
            <CreatePost />
            {users && posts && posts.map((post, index) => (
              <Post key={index} post={post} user={users[index]} />
            ))}
          </div>
          <div className="col-md-3">
            <ConnectButton />
            <FollowList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
