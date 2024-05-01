import React from "react";
import "./CreatePost.css";

const CreatePost = () => {
  return (
    <div className="CreatePost">
      <div className="card">
        <div className="card-body">
          {/* add profile photo over here */}
          <div className="d-flex align-items-center mt-1 mb-3">
            <img
              src="https://via.placeholder.com/150"
              className="rounded-circle post-avatar"
              alt="User"
            />
            <h2 className="card-title mt-2 ml-2 username mx-1">Username</h2>
          </div>
          <hr className="mb-1" />
          <form>
            <div className="form-group">
              <textarea
                className="form-control text-box"
                id="postContent"
                rows="4"
                placeholder="Share your thoughts..."
              ></textarea>
            </div>
            <div className="d-flex justify-content-end mt-2">
              <button type="submit" className="btn btn-primary mt-2 btn-post">
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
