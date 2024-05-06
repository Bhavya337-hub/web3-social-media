import React, { useState, useEffect } from "react";
import Navbar from "../../components/Navbar/Navbar";
import CreatePoll from "../../components/CreatePoll/CreatePoll";
import Welcome from "../Welcome/Welcome";
import Poll from "../../components/Poll/Poll";

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { useSocialMedia } from "../../Context/SocialMediaContext";
import { PollContractABI, PollContractAddress } from "../../Context/constants";

const Polls = () => {
  const [polls, setPolls] = useState([]);

  useEffect(() => {
    fetchPolls();
  }, []);

  if (!localStorage.getItem("isRegistered")) {
    return <Welcome />;
  }

  const fetchPolls = async () => {
    try {
      const res = await readContract(config, {
        abi: PollContractABI,
        address: PollContractAddress,
        functionName: "getPolls",
      });

      setPolls(res);
    } catch (error) {
      console.log("Error while fetching polls", error);
    }
  };

  return (
    <div className="Polls">
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-3">
            <Navbar />
          </div>
          <div className="col-md-6">
            <CreatePoll />
            <div className="mt-4">
              {polls.map((poll) => (
                <Poll key={poll.id} poll={poll} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Polls;
