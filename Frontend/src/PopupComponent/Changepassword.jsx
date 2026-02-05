import React, { useState } from 'react';

function Changepassword() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");

  const handlePassword = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/changepw", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ oldPassword, newPassword })
      });

      const data = await res.json();
      setMessage(data.message);

    } catch (err) {
      console.error(err);
      setMessage("Password update failed");
    }
  };

  return (
    <div style={{ margin: "20px" , backgroundColor:'#2b9ff7',borderRadius:'10px',padding:'10px'}}>
      <div>
        <label>Old Password:</label><br />
        <input
          type="password"
          placeholder="Enter old password"
          onChange={(e) => setOldPassword(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        />
      </div>

      <div style={{ marginTop: "10px" }}>
        <label>New Password:</label><br />
        <input
          type="password"
          placeholder="Enter new password"
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ padding: "10px", borderRadius: "8px" }}
        />
      </div>

      <button
        onClick={handlePassword}
        style={{
          marginTop: "15px",
          padding: "8px 25px",
          backgroundColor: "white",
          border: "none",
          borderRadius: "6px",
          cursor: "pointer",
          boxShadow:'1px 1px 10px 1px'
        }}
      >
        Save
      </button>

      <p>{message}</p>
    </div>
  );
}

export default Changepassword;
