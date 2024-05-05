import React, { useEffect, useState } from "react";

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { useSocialMedia } from "../../Context/SocialMediaContext";
import { PollContractABI, PollContractAddress } from "../../Context/constants";

const Poll = (props) => {
  const { poll } = props;
  const { address } = useSocialMedia();
  const [votes, setVotes] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);

  const fetchVotes = async () => {
    try {
      const res = await readContract(config, {
        abi: PollContractABI,
        address: PollContractAddress,
        functionName: "getVotes",
        args: [parseInt(poll.id)],
      });
      setVotes(res);
    } catch (error) {
      console.log("Error while fetching votes", error);
    }
  };

  const handleVote = async () => {
    try {
      const res = await writeContract(config, {
        abi: PollContractABI,
        address: PollContractAddress,
        functionName: "vote",
        args: [parseInt(poll.id), parseInt(selectedOption)],
        account: address,
      });

      console.log("Poll voted successfully", res);
    } catch (error) {
      console.log("Error while voting poll", error);
    }
  };

  //   struct Poll {
  //     uint id;
  //     address user;
  //     string question;
  //     string[] options;
  //     uint totalVotes;
  //     uint timestamp;
  // }

  // struct Vote {
  //     address user;
  //     uint option;
  // }

  // Poll[] public polls;
  // mapping(uint => Vote[]) public pollVotes;

  const calculatePercentage = (optionIndex) => {
    if (parseInt(poll.totalVotes) === 0) {
      return 0;
    }

    let optionVotes = 0;

    for (let i = 0; i < votes.length; i++) {
      if (parseInt(votes[i].option) === optionIndex) {
        optionVotes++;
      }
    }

    return (optionVotes / parseInt(poll.totalVotes)) * 100;
  };

  useEffect(() => {
    fetchVotes();
  }, []);

  return (
    <div className="Poll">
      <div className="card mt-4">
        <div className="card-body">
          <h5 className="card-title">{poll && poll.question}</h5>
          {/* <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="exampleRadios"
              id="exampleRadios1"
              value="option1"
            />
            <label className="form-check-label" for="exampleRadios1">
              Option 1
            </label>
          </div> */}

          {poll &&
            poll.options.map((option, index) => (
              <div>
                <div key={index} className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name={`options-${poll.id}`}
                    id={`option-${poll.id}-${index}`}
                    value={index}
                    onChange={() => setSelectedOption(index)}
                  />
                  <label
                    className="form-check-label"
                    htmlFor={`option-${poll.id}-${index}`}
                  >
                    {option} - {calculatePercentage(index)}%
                  </label>
                </div>
              </div>
            ))}
          {poll && (
            <button className="btn btn-primary mt-2" onClick={handleVote}>
              Vote
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Poll;
