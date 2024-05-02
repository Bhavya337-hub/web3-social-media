import React from "react";
import Navbar from "../../components/Navbar/Navbar";
import CreatePost from "../../components/CreatePost/CreatePost";
import Post from "../../components/Post/Post";

const Home = () => {
  return (
    <div className="Home">
      {/* Bootstrap layout with three sections first one being one fourth second one being half and third one being one fourth*/}
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Navbar />
          </div>
          <div className="col-md-6">
            <CreatePost />
            <Post />
          </div>
          <div className="col-md-3">{/* <FollowersList /> */}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;
