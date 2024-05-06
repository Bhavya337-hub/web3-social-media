import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { readContract } from "@wagmi/core";
import { config } from "../../../config";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { useSocialMedia } from "../../Context/SocialMediaContext";

const Navbar = () => {
  const [user, setUser] = useState(null);

  const { address } = useSocialMedia();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const data = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getUser",
        args: [address],
      });

      setUser(data);
    } catch (error) {
      console.log("Error while fetching user", error);
    }
  };

  return (
    <div className="Navbar">
      <div className="card">
        <img
          src="https://forkast.news/wp-content/uploads/2022/02/Web3ExplainerPhoto-1260x709.png"
          className="banner-img"
          alt="web3-social media banner"
        />
        <div className="card-body">
          <div className="text-center">
            <img
              src={`${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                user && user.profilePictureHash
              }`}
              className="profile-img"
              alt="User"
            />
            <h2 className="card-title mt-3 username">
              {user && user.username}
            </h2>
            <p className="card-text">{user && user.bio}</p>
          </div>
          <hr />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <div className="d-flex">
                  <span className="material-symbols-outlined px-2">house</span>{" "}
                  Home
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <div className="d-flex">
                  <span className="material-symbols-outlined px-2">
                    account_circle
                  </span>
                  Profile
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/myposts" className="nav-link">
                <div className="d-flex">
                  <span className="material-symbols-outlined px-2">post</span>
                  My Posts
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/polls" className="nav-link">
                <div className="d-flex">
                  <span className="material-symbols-outlined px-2">ballot</span>
                  Polls
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
