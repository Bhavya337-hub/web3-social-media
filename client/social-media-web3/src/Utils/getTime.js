const getTimeSince = (timestamp) => {
  const now = new Date().getTime();
  const postTime = parseInt(timestamp) * 1000; // Convert to milliseconds
  const timeDifference = now - postTime;

  // Calculate time differences
  const seconds = Math.floor(timeDifference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (seconds < 60) {
    return `${seconds} seconds ago`;
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else {
    return `${days} days ago`;
  }
};

export default getTimeSince;
