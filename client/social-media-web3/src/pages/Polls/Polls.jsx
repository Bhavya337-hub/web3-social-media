import React, { useState } from "react";

const demoPolls = [
  {
    question: "What is your favorite color?",
    options: ["Red", "Blue", "Green", "Yellow"],
    votes: [10, 15, 8, 5],
  },
  {
    question: "Which programming language do you prefer?",
    options: ["JavaScript", "Python", "Java", "C++"],
    votes: [20, 18, 12, 7],
  },
];

const Poll = ({ poll, index, vote }) => {
  return (
    <div className="poll">
      <h2>{poll.question}</h2>
      <ul>
        {poll.options.map((option, optionIndex) => (
          <li key={optionIndex} className="option">
            <input
              type="radio"
              name={`poll${index}`}
              value={optionIndex}
              id={`poll${index}Option${optionIndex}`}
            />
            <label htmlFor={`poll${index}Option${optionIndex}`}>{option}</label>
          </li>
        ))}
      </ul>
      <button className="voteBtn" onClick={() => vote(index)}>
        Vote
      </button>
    </div>
  );
};

const PollsPage = () => {
  const [polls, setPolls] = useState(demoPolls);
  const [showForm, setShowForm] = useState(false);
  const [newPoll, setNewPoll] = useState({ question: "", options: [] });

  // Function to handle voting
  const handleVote = (pollIndex) => {
    const selectedOption = document.querySelector(
      `input[name="poll${pollIndex}"]:checked`
    );
    if (selectedOption) {
      const optionIndex = parseInt(selectedOption.value);
      const updatedPolls = polls.map((poll, index) => {
        if (index === pollIndex) {
          const updatedVotes = [...poll.votes];
          updatedVotes[optionIndex]++;
          return { ...poll, votes: updatedVotes };
        }
        return poll;
      });
      setPolls(updatedPolls);
      alert(
        `You voted for option ${optionIndex + 1} in poll ${pollIndex + 1}.`
      );
    } else {
      alert("Please select an option to vote.");
    }
  };

  // Function to handle form submission
  const handleFormSubmit = (event) => {
    event.preventDefault();
    const updatedPolls = [
      ...polls,
      { ...newPoll, votes: new Array(newPoll.options.length).fill(0) },
    ];
    setPolls(updatedPolls);
    setNewPoll({ question: "", options: [] });
    setShowForm(false);
  };

  return (
    <div>
      <header>
        <h1>Polls</h1>
        <button onClick={() => setShowForm(true)}>Create Poll</button>
      </header>
      <main id="pollsContainer">
        {polls.map((poll, index) => (
          <Poll key={index} poll={poll} index={index} vote={handleVote} />
        ))}
      </main>
      {showForm && (
        <div id="createPollForm">
          <h2>Create New Poll</h2>
          <form onSubmit={handleFormSubmit}>
            <label htmlFor="question">Question:</label>
            <input
              type="text"
              id="question"
              value={newPoll.question}
              onChange={(e) =>
                setNewPoll({ ...newPoll, question: e.target.value })
              }
              required
            />
            <br />
            <br />
            <label htmlFor="options">Options:</label>
            <br />
            <textarea
              id="options"
              value={newPoll.options.join("\n")}
              onChange={(e) =>
                setNewPoll({
                  ...newPoll,
                  options: e.target.value
                    .split("\n")
                    .map((option) => option.trim()),
                })
              }
              required
            />
            <br />
            <button type="submit">Create</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default PollsPage;
