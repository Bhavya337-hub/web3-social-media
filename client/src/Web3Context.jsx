import React, { createContext, useContext, useState, useEffect } from "react";
import Web3 from "web3";

const Web3Context = createContext();

export const useWeb3 = () => {
  return useContext(Web3Context);
};

export const Web3Provider = ({ children }) => {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [error, setError] = useState("");

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
      setAccount([accounts[0]]);
      setIsConnected(true);
    } catch (error) {
      setError("An error occurred while connecting to MetaMask.");
      console.error("Error connecting to MetaMask:", error);
    }
  };

  return (
    <Web3Context.Provider
      value={{ web3, account, isConnected, error, connectToMetaMask }}
    >
      {children}
    </Web3Context.Provider>
  );
};
