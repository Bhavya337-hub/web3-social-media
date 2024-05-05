import React, { useState, useEffect } from "react";
import "./FollowList.css";
import { Link } from "react-router-dom";

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { useSocialMedia } from "../../Context/SocialMediaContext";

const FollowList = () => {
  const { address } = useSocialMedia();
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const res = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getUnfollowedUsers",
        account: address,
      });

      console.log("Users", res);

      setUsers(res);
    } catch (error) {
      console.log("Error while fetching users", error);
    }
  };

  return (
    <div className="FollowList">
      <div className="card">
        <div className="card-body">
          <h2 className="card-title fs-5 py-2">Who to Follow</h2>
          {users &&
            users.map((user, index) => {
              return (
                <div
                  key={index}
                  className="d-flex justify-content-between mt-1 mb-3 align-items-center"
                >
                  <div className="d-flex align-items-center">
                    <img
                      src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                        user.profilePictureHash
                      }`}
                      className="rounded-circle post-avatar"
                      alt="User"
                    />
                    <h2 className="card-title username mb-0">
                      {user.username}
                    </h2>
                  </div>
                  <div>
                    <button
                      className="btn btn-link"
                      style={{ textDecoration: "none" }}
                    >
                      <div className="d-flex align-items-center rounded-circle ms-auto follow-btn">
                        <span className="material-symbols-outlined fs-5">
                          add
                        </span>
                      </div>
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default FollowList;
