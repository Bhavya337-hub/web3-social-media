import React, { useState, useEffect, useContext } from "react";
import Web3Modal from "web3modal";
import { ethers } from "ethers";

import { SocialMediaAddress, SocialMediaABI } from "./constants";

// wagmi imports

import { useAccount } from "wagmi";
import { useWriteContract, useReadContract } from "wagmi";

// const fs = require('fs');
// const pinataSDK = require('@pinata/sdk');
// const pinata = new pinataSDK({ pinataJWTKey: import.meta.env.VITE_PINATA_JWT });

import axios from "axios";

const SocialMediaContext = React.createContext();

const SocialMediaProvider = ({ children }) => {
  const title = "Social Media";

  const { writeContract } = useWriteContract();

  // upload image to ipfs

  // const uploadToIPFS = async (file) => {

  //     try {

  //         const stream = fs.createReadStream(file);
  //         const res = await pinata.pinFileToIPFS(stream)

  //     } catch (error) {
  //         console.log("Error while uploading to ipfs", error)
  //     }

  // }

  const { address, isConnecting, isDisconnected } = useAccount();

  return (
    <SocialMediaContext.Provider
      value={{
        title,
        address,
        isConnecting,
        isDisconnected,
      }}
    >
      {children}
    </SocialMediaContext.Provider>
  );
};

const useSocialMedia = () => useContext(SocialMediaContext);

export { SocialMediaProvider, useSocialMedia };
