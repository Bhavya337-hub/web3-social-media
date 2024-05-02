import React from "react";
import "./CreatePost.css";

const CreatePost = () => {
  const handleTextareaChange = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";
  };

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
          <hr className="mb-3" />
          <form>
            <div className="form-group">
              <textarea
                className="form-control text-box"
                id="postContent"
                rows="3"
                placeholder="Share your thoughts..."
                onChange={handleTextareaChange}
              ></textarea>
            </div>
            <div className="d-flex mt-2 justify-content-between">
              <div className="d-flex">
                <div className="mt-2">
                  <button className="btn btn-primary btn-sm d-flex btn-function">
                    <span class="material-symbols-outlined">movie</span>
                    <span className="mx-2">Media</span>
                  </button>
                </div>
                <div className="mt-2 mx-3">
                  <button className="btn btn-primary btn-sm d-flex btn-function">
                    <span class="material-symbols-outlined">mood</span>
                    <span className="mx-2">Emoji</span>
                  </button>
                </div>
              </div>
              <button type="submit" className="btn btn-primary btn-sum mt-2 btn-post">
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
