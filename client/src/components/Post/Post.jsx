import React from "react";
import "./Post.css";
import { Link } from "react-router-dom";
import Comment from "../Comment/Comment";

const Post = () => {
  return (
    <div className="Post">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center mt-1 mb-3">
            <img
              src="https://via.placeholder.com/150"
              className="rounded-circle post-avatar"
              alt="User"
            />
            <h2 className="card-title mt-2 ml-2 username">Username</h2>
            <span className="mx-2">&#8226;</span>
            <p className="card-text time-text"> 2 hours ago</p>
          </div>
          <hr />
          <p className="card-text post-text">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla
            faucibus, nunc eget luctus dictum, nunc dui tincidunt mi, vitae
            cursus nisl metus nec sapien. Donec non est at libero.
          </p>
          <div className="media-container">
            {/* <img
              src="https://via.placeholder.com/150"
              className="post-media"
              alt="Post media"
            /> */}
            <video controls className="post-media">
              <source
                src="https://www.w3schools.com/html/mov_bbb.mp4"
                type="video/mp4"
              />
            </video>
          </div>
          {/* likes and comments */}
          <div className="d-flex mt-2">
            <Link to="/" className="d-flex like-comment align-items-center">
              <span class="material-symbols-outlined">thumb_up</span>
              <span className="px-1 like-comment-text">500 Likes</span>
            </Link>
            <Link
              to="/"
              className="d-flex like-comment align-items-center mx-2"
            >
              <span class="material-symbols-outlined">thumb_up</span>
              <span className="px-1 like-comment-text">500 Comments</span>
            </Link>
          </div>
          <hr />
          {/* Comments with avatar */}
          <div className="d-flex align-items-center mt-1 mb-3">
            <img
              src="https://via.placeholder.com/150"
              className="rounded-circle post-avatar"
              alt="User"
            />
            {/* Post a comment box */}
            <form className="comment-box">
              <div className="form-group d-flex justify-content-between align-items-center">
                <textarea
                  className="form-control text-box"
                  id="commentContent"
                  rows="1"
                  placeholder="Add a comment..."
                ></textarea>
                <Link to="/" className="send-comment">
                  <span class="material-symbols-outlined px-2">send</span>
                </Link>
              </div>
            </form>
          </div>
          <Comment />
          <Comment />
          <Comment />
          <Comment />
          <Comment />
        </div>
      </div>
    </div>
  );
};

export default Post;
