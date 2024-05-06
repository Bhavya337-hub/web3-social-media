import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// import Web3 from "web3";

const Register = () => {
  const [account, setAccount] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");
  const [web3, setWeb3] = useState(null);
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [selectedFile, setSelectedFile] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    const initWeb3 = async () => {
      try {
        // Check if Web3 is injected by MetaMask
        if (window.ethereum) {
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);
        } else {
          setError(
            "Please install MetaMask to connect to the Ethereum network."
          );
        }
      } catch (error) {
        setError("An error occurred while connecting to MetaMask.");
        console.error("Error connecting to MetaMask:", error);
      }
    };

    initWeb3();
  }, []);

  const connectToMetaMask = async () => {
    try {
      // Request access to user's MetaMask accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });

      // Get the user's accounts
      const accounts = await web3.eth.getAccounts();

      // Only take the first account
      setAccount(accounts[0]);
      setIsConnected(true);

      try {
        const res = await fetch(
          `http://localhost:5000/api/user/userExists/${accounts[0]}`
        );
        const resData = await res.json();
        if (resData.exists) {
          setIsRegistered(true);
        }
      } catch (error) {
        console.log(error);
      }
    } catch (error) {
      setError("An error occurred while connecting to MetaMask.");
      console.error("Error connecting to MetaMask:", error);
    }
  };

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: account,
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

      const pinataRes = await res.json();
      const profilePictureHash = pinataRes.IpfsHash;

      const createUserRes = await fetch(
        "http://localhost:5000/api/user/createUser",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username,
            bio,
            profilePictureHash,
          }),
        }
      );

      const createUserResData = await createUserRes.json();
      console.log(createUserResData);

      localStorage.setItem("account", account);
      localStorage.setItem("user", JSON.stringify(createUserResData));

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="Register container mt-5">
      <button className="btn btn-primary" onClick={connectToMetaMask}>
        Connect to MetaMask
      </button>
      {isConnected && !isRegistered && (
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
      {isConnected && isRegistered && (
        <h3 className="mt-3">You are already registered!</h3>
      )}
      {error && <h3 className="mt-3 text-danger">{error}</h3>}
    </div>
  );
};

export default Register;
