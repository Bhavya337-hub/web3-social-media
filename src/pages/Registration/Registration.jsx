import { useState } from "react";

function RegistrationForm() {
  const [selectedFile, setSelectedFile] = useState();
  const [username, setUsername] = useState("");
  const [bio, setBio] = useState("");
  const [profilePictureHash, setProfilePictureHash] = useState("");

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmission = async () => {
    try {
      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: username,
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      // Add user data to the form data
      formData.append("username", username);
      formData.append("bio", bio);
      formData.append("profilePictureHash", profilePictureHash);

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
      const resData = await res.json();
      console.log(resData);

      // After successful file upload, create the user
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
            profilePictureHash: resData.IpfsHash, // Assuming IpfsHash is returned from Pinata
          }),
        }
      );
      const createUserResData = await createUserRes.json();
      console.log(createUserResData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <label className="form-label">Username</label>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <label className="form-label">Bio</label>
      <textarea value={bio} onChange={(e) => setBio(e.target.value)}></textarea>

      <label className="form-label">Choose File</label>
      <input type="file" onChange={changeHandler} />
      <button onClick={handleSubmission}>Submit</button>
    </>
  );
}

export default RegistrationForm;
