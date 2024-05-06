import React, { useEffect, useState } from "react";
import "./MyPosts.css";
import Post from "../../components/Post/Post";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import FollowingList from "../../components/FollowList/FollowList";
import { readContract } from "@wagmi/core";
import ConnectButton from "../../components/ConnectButton";
import { config } from "../../../config";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { useSocialMedia } from "../../Context/SocialMediaContext";
import Welcome from "../Welcome/Welcome";

const MyPosts = () => {
  const [posts, setPosts] = useState([]);
  const [user, setUser] = useState(null);
  const { address } = useSocialMedia();

  if (!localStorage.getItem("isRegistered")) {
    return <Welcome />;
  }

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    try {
      const data = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getUserPosts",
        args: [address],
      });

      setPosts(data);

      try {
        const user = await readContract(config, {
          abi: SocialMediaABI,
          address: SocialMediaAddress,
          functionName: "getUser",
          args: [address],
        });

        setUser(user);
      } catch (error) {
        console.log("Error while fetching user", error);
      }
    } catch (error) {
      console.log("Error while fetching posts", error);
    }
  };

  return (
    <div className="MyPosts">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Navbar />
          </div>
          <div className="col-md-6">
            <CreatePost />
            {posts.map((post, index) => (
              <Post key={index} post={post} user={user} />
            ))}
          </div>
          <div className="col-md-3">
            <ConnectButton />
            <FollowingList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyPosts;
