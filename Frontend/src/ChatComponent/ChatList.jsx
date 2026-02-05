import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function ChatList() {
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const myId = localStorage.getItem("userId");

  useEffect(() => {
    if (!token) return;

    fetch("http://localhost:5000/api/auth/chat/my", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => {
        if (!res.ok) {
          throw new Error("Failed to fetch chats");
        }
        return res.json();
      })
      .then(data => {
        console.log("MY CHATS 👉", data); // 🔥 IMPORTANT DEBUG
        setChats(data);
      })
      .catch(err => {
        console.error(err);
      });
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Chats</h2>

      {chats.length === 0 ? (
        <p>No chats found</p>
      ) : (
        chats.map(chat => {
          const otherUser = chat.participants.find(
            user => user._id !== myId
          );

          return (
            <div
              key={chat._id}
              onClick={() =>
                navigate("/chat", {
                  state: {
                    chatId: chat._id,
                    otherUser
                  }
                })
              }
              style={{
                padding: 15,
                marginBottom: 10,
                background: "#5ba3fb",
                color: "#fff",
                borderRadius: 8,
                cursor: "pointer"
              }}
            >
              <strong>{otherUser?.name}</strong>
              <div style={{ fontSize: 12 }}>
                {otherUser?.email}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default ChatList;
