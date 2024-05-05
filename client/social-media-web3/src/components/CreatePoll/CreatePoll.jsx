import React, { useEffect, useState } from "react";

import { readContract, writeContract } from "@wagmi/core";
import { config } from "../../../config";
import { useSocialMedia } from "../../Context/SocialMediaContext";
import { PollContractABI, PollContractAddress } from "../../Context/constants";

import "./CreatePoll.css";

const CreatePoll = () => {
  const { address } = useSocialMedia();

  const [question, setQuestion] = useState("");
  const [options, setOptions] = useState(["", ""]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    if (options.length >= 2) {
      setOptions([...options, ""]);
    }
  };

  const handleDeleteOption = (index) => {
    if (options.length > 2) {
      const updatedOptions = options.filter((_, i) => i !== index);
      setOptions(updatedOptions);
    }
  };

  const handleCreatePoll = (e) => {
    e.preventDefault();

    try {
      const res = writeContract(config, {
        abi: PollContractABI,
        address: PollContractAddress,
        functionName: "createPoll",
        args: [question, options],
        account: address,
      });

      console.log("Poll created successfully", res);
    } catch (error) {
      console.log("Error while creating poll", error);
    }
  };

  return (
    <div className="CreatePoll">
      <h1 className="mb-4">Create Poll</h1>
      <form onSubmit={handleCreatePoll} style={{ width: "100%" }}>
        <div className="form-group mb-4">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            className="form-control"
            id="question"
            placeholder="Enter your question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        {options.map((option, index) => (
          <div key={index} className="form-group mb-4">
            <label htmlFor={`option${index}`}>Option {index + 1}</label>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                id={`option${index}`}
                placeholder={`Enter option ${index + 1}`}
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
              />
              {options.length > 2 && (
                <div className="input-group-append">
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleDeleteOption(index)}
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        ))}
        <button
          type="button"
          className="btn btn-primary mb-3"
          onClick={handleAddOption}
        >
          Add Option
        </button>
        <button type="submit" className="btn btn-primary mb-3 mx-3">
          Create Poll
        </button>
      </form>
    </div>
  );
};

export default CreatePoll;
