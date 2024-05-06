import React from "react";
import getTimeSince from "../../Utils/getTime";

const Comment = (props) => {
  const { user, comment } = props;

  return (
    <div className="d-flex align-items-start mt-1 mb-3">
      <img
        src={
          user &&
          `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${user.profilePictureHash}`
        }
        className="rounded-circle post-avatar"
        alt="User"
      />
      <div className="card-text comment-text comment-box p-3">
        <div className="d-flex justify-content-between pb-1">
          <h2 className="card-title username">{user && user.username}</h2>
          <p className="card-text time-text">
            {comment && getTimeSince(parseInt(comment.timestamp))}
          </p>
        </div>
        {comment && comment.content}
      </div>
    </div>
  );
};

export default Comment;
