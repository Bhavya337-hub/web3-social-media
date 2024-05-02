import React from "react";
import "./FollowList.css";
import { Link } from "react-router-dom";

const FollowingList = () => {
  return (
    <div className="FollowingList">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title fs-5 py-2">Who to Follow</h2>
          <div className="d-flex justify-content-between mt-1 mb-3 align-items-center">
            <div className="d-flex align-items-center">
              <img
                src="https://via.placeholder.com/150"
                className="rounded-circle post-avatar"
                alt="User"
              />
              <h2 className="card-title username mb-0">Username</h2>
            </div>
            <div>
              <Link to="/" style={{ textDecoration: "none" }}>
                <button className="btn btn-primary d-flex align-items-center rounded-circle ms-auto follow-btn">
                  <span class="material-symbols-outlined fs-5">add</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FollowingList;
