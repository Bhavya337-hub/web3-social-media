import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import ConnectButton from "../../components/ConnectButton";
import { useSocialMedia } from "../../Context/SocialMediaContext";
import { readContract, writeContract } from "@wagmi/core";
import { SocialMediaABI, SocialMediaAddress } from "../../Context/constants";
import { config } from "../../../config";

const Welcome = () => {
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [selectedFile, setSelectedFile] = useState("");

  const navigate = useNavigate();

  const { address, isConnecting } = useSocialMedia();

  const checkRegistration = async () => {
    try {
      const data = await readContract(config, {
        abi: SocialMediaABI,
        address: SocialMediaAddress,
        functionName: "isUser",
        args: [address],
      });

      setIsRegistered(data);

      if (data) {
        try {
          const data = await readContract(config, {
            abi: SocialMediaABI,
            address: SocialMediaAddress,
            functionName: "getUser",
            args: [address],
          });

          localStorage.setItem("isRegistered", true);

          navigate("/");
          // window.location.reload();
        } catch (error) {
          console.log(error);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkRegistration();
  }, []);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      console.log(address);
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: address,
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
      const profilePictureHash = pinataRes.IpfsHash;

      try {
        const res = await writeContract(config, {
          address: SocialMediaAddress,
          abi: SocialMediaABI,
          functionName: "createUser",
          args: [username, bio, profilePictureHash],
          account: address,
        });

        localStorage.setItem("isRegistered", true);

        navigate("/");
      } catch (error) {
        console.log("Error while creating user", error);
      }

      // localStorage.setItem("account", accounts[0]);
      // localStorage.setItem("user", JSON.stringify(createUserResData));

      // navigate("/");
      // window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Welcome container mt-5">
      <ConnectButton />
      {!isRegistered && (
        <div className="mt-3">
          <h3>Register</h3>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <input
              type="file"
              className="form-control"
              accept="image/*"
              onChange={changeHandler}
            />
          </div>
          <button className="btn btn-success" onClick={handleSubmission}>
            Register
          </button>
        </div>
      )}
      {error && <h3 className="mt-3 text-danger">{error}</h3>}
    </div>
  );
};

export default Welcome;
