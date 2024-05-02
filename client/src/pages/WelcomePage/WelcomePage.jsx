import React from "react";
import "./WelcomePage.css";

const WelcomePage = ({ error, connectToMetaMask }) => {
  return (
    <div>
      <div className="background-img"></div>
      <div className="WelcomePage d-flex align-items-end justify-content-center mx-5">
        <div className="card p-5 welcome-card">
          <div className="row">
            <div className="col-md-12 my-4 welcome-heading">
              <h1>Welcome to Web3 Social Media</h1>
            </div>
          </div>
          {/* Connect to wallet button and errors if any */}
          <div className="row">
            <div className="col-md-12 text-center mt-4">
              <button
                onClick={connectToMetaMask}
                className="btn btn-primary btn-meta"
              >
                Connect to MetaMask
              </button>
            </div>
          </div>
          {/* Display errors if any */}
          {error && (
            <div className="row">
              <div className="col-md-12 text-center mt-4">
                <p className="text-danger">{error}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WelcomePage;
