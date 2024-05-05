import React, { useState, useEffect } from "react";
import "./CreatePost.css";

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { useSocialMedia } from "../../Context/SocialMediaContext";

const CreatePost = () => {
  const [user, setUser] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [postContent, setPostContent] = useState("");
  const [postId, setPostId] = useState(0);

  const { address } = useSocialMedia();

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    try {
      const user = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getUser",
        args: [address],
      });

      setUser(user);
    } catch (error) {
      console.log("Error while fetching user", error);
    }
  };

  const handleTextareaChange = (event) => {
    event.target.style.height = "auto";
    event.target.style.height = event.target.scrollHeight + "px";

    setPostContent(event.target.value);
  };

  const handleSubmission = async (event) => {
    event.preventDefault();

    try {
      const res = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "getNextPostId",
      });

      const convertedRes = parseInt(res);
      setPostId(convertedRes);
    } catch (error) {
      console.log("Error while fetching post id", error);
    }

    try {
      console.log(postId);
      console.log(address);
      const formData = new FormData();
      formData.append("file", selectedFile);

      const mimeType = selectedFile.type;
      const fileType = mimeType.split("/")[0];

      const metadata = JSON.stringify({
        name: "Post",
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      const res = await fetch(
        "https://api.pinata.cloud/pinning/pinFileToIPFS",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
          },
          body: formData,
        }
      );

      console.log(res);

      const pinataRes = await res.json();
      const mediaHash = pinataRes.IpfsHash;

      try {
        const tx = await writeContract(config, {
          abi: SocialMediaABI,
          address: SocialMediaAddress,
          functionName: "createPost",
          args: [postContent, mediaHash, fileType],
          account: address,
        });

        console.log(tx);
      } catch (error) {
        console.log("Error while creating post", error);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="CreatePost">
      <div className="card">
        <div className="card-body">
          {/* add profile photo over here */}
          <div className="d-flex align-items-center mt-1 mb-3">
            <img
              src={
                user &&
                `${import.meta.env.VITE_GATEWAY_URL}/ipfs/${
                  user.profilePictureHash
                }`
              }
              className="rounded-circle post-avatar"
              alt="User"
            />
            <h2 className="card-title mt-2 ml-2 username mx-1">
              {user && user.username}
            </h2>
          </div>
          <hr className="mb-3" />
          <form onSubmit={handleSubmission}>
            <div className="form-group">
              <textarea
                className="form-control text-box"
                id="postContent"
                rows="3"
                placeholder="Share your thoughts..."
                onChange={handleTextareaChange}
              ></textarea>
            </div>
            <div className="d-flex mt-2 justify-content-between">
              <div className="d-flex">
                <div className="mt-2">
                  {/* <label
                    htmlFor="mediaUpload"
                    className="btn btn-primary btn-sm d-flex btn-function"
                  >
                    <span className="material-symbols-outlined">movie</span>
                    <span className="mx-2">Media</span>
                  </label> */}
                  <input
                    id="mediaUpload"
                    type="file"
                    accept="image/*,video/*"
                    className="mx-3"
                    onChange={(e) => setSelectedFile(e.target.files[0])}
                  />
                </div>

                {/* <div className="mt-2 mx-3">
                  <button className="btn btn-primary btn-sm d-flex btn-function">
                    <span className="material-symbols-outlined">mood</span>
                    <span className="mx-2">Emoji</span>
                  </button>
                </div> */}
              </div>
              <button
                type="submit"
                className="btn btn-primary btn-sum mt-2 btn-post"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreatePost;
