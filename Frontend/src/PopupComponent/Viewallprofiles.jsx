import React, { useEffect, useState } from 'react';

function Viewallprofiles() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/viewall', {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`
      }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(e => setMessage("Failed to fetch users"));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>All Profiles</h2>

      {message && <p style={{ color: 'red', textAlign: 'center' }}>{message}</p>}

      <div
        className="user-container"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          width:'100%',
          gap: '15px',
          backgroundColor: 'lightskyblue',
          padding: '15px',
          borderRadius: '10px',
          justifyContent:'center',
          maxHeight: '70vh',
          overflowY: 'auto'
        }}
      >
        {users.map((item) => (
          <div
            key={item._id}
            style={{
              backgroundColor: 'white',
              border: '1px solid #333',
              borderRadius: '8px',
              padding: '15px',
              width: '80%',
              boxShadow: '0 4px 6px rgba(0,0,0,0.2)'
            }}
          >
            <p><strong>Name:</strong> {item.name}</p>
            <p><strong>Email:</strong> {item.email}</p>
            <p><strong>Role:</strong> {item.role}</p>
            <p><strong>Skill:</strong> {item.skill}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Viewallprofiles;
