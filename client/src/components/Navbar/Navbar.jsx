import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";

const Navbar = () => {
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
              src="https://via.placeholder.com/150"
              className="profile-img"
              alt="User"
            />
            <h2 className="card-title mt-3 username">Username</h2>
            <p className="card-text">
              Bio - Lorem ipsum dolor sit amet, consectetur adipiscing elit.
              Nulla faucibus
            </p>
          </div>
          <hr />
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <div className="d-flex">
                  <span class="material-symbols-outlined px-2">house</span> Home
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/profile" className="nav-link">
                <div className="d-flex">
                  <span class="material-symbols-outlined px-2">
                    account_circle
                  </span>
                  Profile
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/posts" className="nav-link">
                <div className="d-flex">
                  <span class="material-symbols-outlined px-2">post</span>
                  My Posts
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/posts" className="nav-link">
                <div className="d-flex">
                  <span class="material-symbols-outlined px-2">ballot</span>
                  Polls
                </div>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/posts" className="nav-link">
                <div className="d-flex">
                  <span class="material-symbols-outlined px-2">settings</span>
                  Settings
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
