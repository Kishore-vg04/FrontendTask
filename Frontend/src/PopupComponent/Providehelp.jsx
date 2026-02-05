import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Providehelp() {
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    fetch('http://localhost:5000/api/auth/providehelp', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(e => setMessage("Failed to fetch users"));
  }, []);

  const handleHelp = async (otherUserId, name) => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ otherUserId })
      });
      const chat = await res.json();
      navigate("/chat", { state: { chatId: chat._id, name } });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <div style={{
        display: "flex", flexWrap: "wrap", gap: "20px",
        justifyContent: "center", maxHeight:'70vh', overflowY:'scroll'
      }}>
        {users.map((item) => (
          <div key={item._id} style={{
            width: "400px", backgroundColor: "#5ba3fb",
            borderRadius: "10px", padding: "20px",
            display:'flex', justifyContent:'space-between', alignItems:'center'
          }}>
            <div>
              <p><strong>Name:</strong> {item.name}</p>
              <p><strong>Email:</strong> {item.email}</p>
              <p><strong>Helper:</strong> {item.problem}</p>
            </div>
            <button onClick={() => handleHelp(item._id, item.name)}
              style={{
                padding:'5px 10px', backgroundColor:'white',
                color:'#5ba3fb', fontWeight:'bold',
                border:'none', borderRadius:'3px'
              }}>HELP</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Providehelp;
