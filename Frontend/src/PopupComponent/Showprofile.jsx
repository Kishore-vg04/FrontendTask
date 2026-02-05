import React, { useEffect, useState } from "react";
import "./Showprofile.css";

function Showprofile() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const token = localStorage.getItem("token");

    fetch("http://localhost:5000/api/auth/fetch", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          const errMsg = await res.text();
          throw new Error(errMsg || "Failed to fetch profile");
        }
        return res.json();
      })
      .then((data) => setUsers([data]))
      .catch((err) => {
        console.error("Fetch profile error:", err);
        setError("Failed to fetch profile");
      });
  }, []);

  return (
    <div className="showitems">
      {error && <p style={{ color: "red" }}>{error}</p>}

      {users.length === 0 && !error ? (
        <p>No users found</p>
      ) : (
        users.map((item) => (
          <div 
            key={item._id}
            style={{
              padding: "10px",
              margin: "10px 0",
              display:'flex'
            }}
          >
            {item.image && (
              <div>
                <img
                  src={item.image}
                  alt="profile"
                  style={{ width: "150px", height: "150px", objectFit: "cover",borderRadius:"20px" }}
                />
              </div>
            )}
            <div>
              <p>
                <strong>Name:</strong> {item.name}
              </p>
              <p>
                <strong>Email:</strong> {item.email}
              </p>
              <p>
                <strong>Role:</strong> {item.role}
              </p>
              <p>
                <strong>Skill:</strong> {item.skill}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Showprofile;
