import React from "react";

const Comment = () => {
  return (
    <div className="d-flex align-items-start mt-1 mb-3">
      <img
        src="https://via.placeholder.com/150"
        className="rounded-circle post-avatar"
        alt="User"
      />
      <p className="card-text comment-text comment-box p-3">
        <div className="d-flex justify-content-between pb-1">
          <h2 className="card-title username">Username</h2>
          <p className="card-text time-text"> 2 hours ago</p>
        </div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla faucibus,
        nunc eget luctus dictum, nunc dui tincidunt mi, vitae cursus nisl metus
        nec sapien. Donec non est at libero.
      </p>
    </div>
  );
};

export default Comment;
