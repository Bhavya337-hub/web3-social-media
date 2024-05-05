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

      try {
        const data = await readContract(config, {
          abi: SocialMediaABI,
          address: SocialMediaAddress,
          functionName: "getUser",
          args: [address],
        });

        localStorage.setItem("user", JSON.stringify(data.username));
        localStorage.setItem("account", address);

        navigate("/");
        // window.location.reload();
      } catch (error) {
        console.log(error);
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
      {!isConnecting && !isRegistered && (
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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import Web3 from "web3";

// const Welcome = () => {
//   const [accounts, setAccount] = useState([]);
//   const [isConnected, setIsConnected] = useState(false);
//   const [isRegistered, setIsRegistered] = useState(false);
//   const [error, setError] = useState("");
//   const [web3, setWeb3] = useState(null);
//   const [username, setUsername] = useState("");
//   const [bio, setBio] = useState("");
//   const [selectedFile, setSelectedFile] = useState();

//   const navigate = useNavigate();

//   useEffect(() => {
//     const initWeb3 = async () => {
//       try {
//         // Check if Web3 is injected by MetaMask
//         if (window.ethereum) {
//           const web3Instance = new Web3(window.ethereum);
//           setWeb3(web3Instance);
//         } else {
//           setError(
//             "Please install MetaMask to connect to the Ethereum network."
//           );
//         }
//       } catch (error) {
//         setError("An error occurred while connecting to MetaMask.");
//         console.error("Error connecting to MetaMask:", error);
//       }
//     };

//     initWeb3();
//   }, []);

//   const connectToMetaMask = async () => {
//     try {
//       // Request access to user's MetaMask accounts
//       await window.ethereum.request({ method: "eth_requestAccounts" });

//       // Get the user's accounts
//       const accs = await web3.eth.getAccounts();

//       // Only take the first account
//       setAccount(accs);
//       setIsConnected(true);

//       console.log(accs[0]);

//       try {
//         const res = await fetch(
//           `http://localhost:5000/api/user/userExists/${accs[0]}`
//         );
//         const resData = await res.json();
//         console.log(resData);
//         if (resData.exists) {
//           localStorage.setItem("account", accs[0]);

//           try {
//             const userRes = await fetch(
//               `http://localhost:5000/api/user/getUser/${accs[0]}`
//             );
//             const userResData = await userRes.json();
//             console.log(userResData);
//             localStorage.setItem("user", JSON.stringify(userResData.user));
//           } catch (error) {
//             console.log(error);
//           }

//           setIsRegistered(true);
//           navigate("/");
//           window.location.reload();
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     } catch (error) {
//       setError("An error occurred while connecting to MetaMask.");
//       console.error("Error connecting to MetaMask:", error);
//     }
//   };

// const changeHandler = (event) => {
//   setSelectedFile(event.target.files[0]);
// };

//   const handleSubmission = async () => {
//     try {
//       console.log(accounts[0]);
//       const formData = new FormData();
//       formData.append("file", selectedFile);
//       const metadata = JSON.stringify({
//         name: accounts[0],
//       });
//       formData.append("pinataMetadata", metadata);

//       const options = JSON.stringify({
//         cidVersion: 0,
//       });
//       formData.append("pinataOptions", options);

//       const res = await fetch(
//         "https://api.pinata.cloud/pinning/pinFileToIPFS",
//         {
//           method: "POST",
//           headers: {
//             Authorization: `Bearer ${import.meta.env.VITE_PINATA_JWT}`,
//           },
//           body: formData,
//         }
//       );

//       const pinataRes = await res.json();
//       const profilePictureHash = pinataRes.IpfsHash;

// const createUserRes = await fetch(
//   "http://localhost:5000/api/user/createUser",
//   {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       username,
//       bio,
//       profilePictureHash,
//     }),
//   }
// );

//       const createUserResData = await createUserRes.json();
//       console.log(createUserResData);

//       localStorage.setItem("account", accounts[0]);
//       localStorage.setItem("user", JSON.stringify(createUserResData));

//       navigate("/");
//       window.location.reload();
//     } catch (error) {
//       console.log(error);
//     }
// };

//   return (
//     <div className="Welcome container mt-5">
//       <button className="btn btn-primary" onClick={connectToMetaMask}>
//         Connect to MetaMask
//       </button>
//       {isConnected && !isRegistered && (
//         <div className="mt-3">
//           <h3>Register</h3>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Username"
//               value={username}
//               onChange={(e) => setUsername(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="text"
//               className="form-control"
//               placeholder="Bio"
//               value={bio}
//               onChange={(e) => setBio(e.target.value)}
//             />
//           </div>
//           <div className="mb-3">
//             <input
//               type="file"
//               className="form-control"
//               accept="image/*"
//               onChange={changeHandler}
//             />
//           </div>
//           <button className="btn btn-success" onClick={handleSubmission}>
//             Register
//           </button>
//         </div>
//       )}
//       {isConnected && isRegistered && (
//         <h3 className="mt-3">You are already registered!</h3>
//       )}
//       {error && <h3 className="mt-3 text-danger">{error}</h3>}
//     </div>
//   );
// };

// export default Welcome;
