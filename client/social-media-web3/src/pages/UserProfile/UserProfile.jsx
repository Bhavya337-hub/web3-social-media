// UserProfile.js
import React, { useState } from "react";
import "./UserProfile.css"; // Import CSS file

const UserProfile = () => {
  // Sample user data
  const initialUser = {
    username: "example_username",
    profileName: "John Doe",
    bio: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
    numberOfPosts: 20,
    followers: 1000,
    following: 500,
  };

  // Sample posts data
  const initialPosts = [
    { image: "post1.jpg", caption: "Post 1 caption" },
    { image: "post2.jpg", caption: "Post 2 caption" },
    // Add more posts as needed
  ];

  // State variables
  const [user, setUser] = useState(initialUser);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({});
  const [posts] = useState(initialPosts); // Initialize posts state with initialPosts

  // Function to handle editing profile
  const handleEditProfile = () => {
    setIsEditing(true);
    setUpdatedUser({ ...user });
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Function to save changes
  const handleSaveChanges = () => {
    setUser(updatedUser);
    setIsEditing(false);
  };

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-image">
          {/* Add your profile image here */}
          <img src="profile-image.jpg" alt="Profile" />
        </div>
        <div className="profile-info">
          {isEditing ? (
            <>
              <input
                type="text"
                name="profileName"
                value={updatedUser.profileName}
                onChange={handleChange}
              />
              <input
                type="text"
                name="username"
                value={updatedUser.username}
                onChange={handleChange}
              />
            </>
          ) : (
            <>
              <h2>{user.profileName}</h2>
              <span className="username">{user.username}</span>
            </>
          )}
          <p>{user.bio}</p>
          {isEditing ? (
            <button onClick={handleSaveChanges}>Save Changes</button>
          ) : (
            <button onClick={handleEditProfile}>Edit Profile</button>
          )}
        </div>
      </div>
      <div className="profile-stats">
        <div className="stat">
          <span>{user.numberOfPosts}</span>
          <span>posts</span>
        </div>
        <div className="stat">
          <span>{user.followers}</span>
          <span>followers</span>
        </div>
        <div className="stat">
          <span>{user.following}</span>
          <span>following</span>
        </div>
      </div>
      {/* UserPosts component to show user's posts */}
      <div className="user-posts">
        <h3>Posts</h3>
        <div className="post-container">
          {posts.map((post, index) => (
            <div className="post" key={index}>
              <img src={post.image} alt={`Post ${index}`} />
              <p>{post.caption}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
