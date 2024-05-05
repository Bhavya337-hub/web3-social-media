import React, { useState, useEffect } from "react";

import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import Post from "../../components/Post/Post";
import FollowList from "../../components/FollowList/FollowList";
import Welcome from "../Welcome/Welcome";
import ConnectButton from "../../components/ConnectButton";

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")));
  }, []);

  if (!user) {
    return <Welcome />;
  }

  return (
    <div className="Home">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Navbar />
          </div>
          <div className="col-md-6">
            <CreatePost />
            {/* <Post */}
          </div>
          <div className="col-md-3">
            <ConnectButton />
            <FollowList />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
