import React, { useState, useEffect } from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { useSocialMedia } from "../../Context/SocialMediaContext";
import getTimeSince from "../../Utils/getTime";

const Post = (props) => {
  const { post, user } = props;
  const [comments, setComments] = useState([]);
  const [commentUsers, setCommentUsers] = useState([]);
  const [showComments, setShowComments] = useState(false);

  const { address } = useSocialMedia();

  const postComment = async (event) => {
    event.preventDefault();

    try {
      const res = await writeContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "commentOnPost",
        args: [
          parseInt(post.id),
          document.getElementById("commentContent").value,
        ],
      });
    } catch (error) {
      console.log("Error while posting comment", error);
    }
  };

  const toggleComments = () => {
    setShowComments(!showComments);
  };

  const getComments = async (postId) => {
    try {
      const res = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getPostComments",
        args: [postId],
      });

      setComments(res);
      getCommentUsers(res);
    } catch (error) {
      console.log("Error while fetching comments", error);
    }
  };

  const getCommentUsers = async (comments) => {
    for (let i = 0; i < comments.length; i++) {
      try {
        const user = await readContract(config, {
          abi: SocialMediaABI,
          address: SocialMediaAddress,
          functionName: "getUser",
          args: [comments[i].user],
        });

        setCommentUsers((prev) => [...prev, user]);
      } catch (error) {
        console.log("Error while fetching user", error);
      }
    }
  };

  const toggleLike = async () => {
    try {
      const res = await writeContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "likeUnlikePost",
        args: [parseInt(post.id)],
        account: address,
      });
    } catch (error) {
      console.log("Error while toggling like", error);
    }
  };

  useEffect(() => {
    getComments(parseInt(post.id));
  }, []);

  return (
    <div className="Post">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center mt-1 mb-3">
            <img
              src={
                user &&
                `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                  user.profilePictureHash
                }`
              }
              className="rounded-circle post-avatar"
              alt="User"
            />
            <h2 className="card-title mt-2 ml-2 username">
              {user && user.username}
            </h2>
            <span className="mx-2">&#8226;</span>
            <p className="card-text time-text">
              {post && getTimeSince(parseInt(post.timestamp))}
            </p>
          </div>
          <hr />
          <p className="card-text post-text">{post && post.content}</p>
          <div className="media-container">
            {post && post.mediaType === "video" ? (
              <video
                controls
                className="post-media"
                src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                  post.mediaHash
                }`}
              />
            ) : (
              <img
                src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                  post.mediaHash
                }`}
                className="post-media"
                alt="Post"
              />
            )}
          </div>
          {/* likes and comments */}
          <div className="d-flex mt-2">
            <button
              className="d-flex like-comment align-items-center btn btn-link"
              onClick={toggleLike}
            >
              <span className="material-symbols-outlined">thumb_up</span>
              <span className="px-1 like-comment-text">
                {post && parseInt(post.likes)} Likes
              </span>
            </button>
            <button
              className="d-flex like-comment align-items-center mx-2 btn btn-link"
              onClick={toggleComments}
            >
              <span className="material-symbols-outlined">thumb_up</span>
              <span className="px-1 like-comment-text">
                {post && parseInt(post.comments)} Comments
              </span>
            </button>
          </div>
          <hr />
          {/* Comments with avatar */}
          <div className="d-flex align-items-center mt-1 mb-3">
            <img
              src={
                user &&
                `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                  user.profilePictureHash
                }`
              }
              className="rounded-circle post-avatar"
              alt="User"
            />
            {/* Post a comment box */}
            <form className="comment-box" onSubmit={postComment}>
              <div className="form-group d-flex justify-content-between align-items-center">
                <textarea
                  className="form-control text-box"
                  id="commentContent"
                  rows="1"
                  placeholder="Add a comment..."
                ></textarea>
                <button className="send-comment btn btn-link">
                  <span className="material-symbols-outlined px-2">send</span>
                </button>
              </div>
            </form>
          </div>
          {showComments &&
            comments.map((comment, index) => (
              <Comment
                key={index}
                user={commentUsers[index]}
                comment={comment}
              />
            ))}
        </div>
      </div>
    </div>
  );
};

export default Post;
