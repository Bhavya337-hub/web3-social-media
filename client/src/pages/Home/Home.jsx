import React, { USEeFF } from "react";

import { useWeb3 } from "../../Web3Context";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import FollowingList from "../../components/FollowList/FollowList";
import WelcomePage from "../WelcomePage/WelcomePage";

const Home = () => {
  const { account, isConnected, connectToMetaMask, error } = useWeb3();

  if (!isConnected) {
    return <WelcomePage error={error} connectTo MetaMask={connectToMetaMask} />;
  }

  useEffect(() => {
    // Update displayAccount when account changes
    if (account) {
      setDisplayAccount(
        `${account.substring(0, 6)}...${account.substring(account.length - 4)}`
      );
    }
  }, [account]);

  return (
    <div className="Home">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Navbar />
          </div>
          <div className="col-md-6">
            <CreatePost />
            <Post />
          </div>
          <div className="col-md-3">
            <button>
              <div className="d-flex">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/36/MetaMask_Fox.svg/2048px-MetaMask_Fox.svg.png"
                  className="btn-login"
                  alt="login-btn"
                />
                <p className="px-2">
                  {account && account.slice(0, 6)}...{account.slice(-4)}
                </p>
              </div>
            </button>
            <FollowingList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
