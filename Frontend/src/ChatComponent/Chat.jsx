import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000"); // backend socket server

function Chat() {
  const { state } = useLocation(); 
  // state = { chatId, otherUser }

  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const messagesEndRef = useRef(null);

  const token = localStorage.getItem("token");
  const myId = localStorage.getItem("userId");

  // 🔹 Fetch chat from DB
  useEffect(() => {
    if (!state?.chatId) return;

    fetch(`http://localhost:5000/api/auth/chat/${state.chatId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setChat(data))
      .catch(err => console.error("Failed to load chat", err));
  }, [state?.chatId]);

  // 🔹 Socket join + receive
  useEffect(() => {
    if (!state?.chatId) return;

    socket.emit("joinChat", state.chatId);

    socket.on("receiveMessage", (msg) => {
      setChat(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          messages: [...prev.messages, msg]
        };
      });
    });

    return () => {
      socket.off("receiveMessage");
    };
  }, [state?.chatId]);

  // 🔹 Auto scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  // 🔹 Send message (DB + Socket)
  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      // 1️⃣ Save to DB
      const res = await fetch("http://localhost:5000/api/auth/chat/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          chatId: state.chatId,
          text
        })
      });

      const updatedChat = await res.json();
      setChat(updatedChat);
      setText("");

      // 2️⃣ Emit socket event
      socket.emit("sendMessage", {
        chatId: state.chatId,
        text,
        sender: myId,
        createdAt: new Date()
      });

    } catch (err) {
      console.error("Send message failed", err);
    }
  };

  if (!chat) {
    return <p style={{ textAlign: "center" }}>Loading chat...</p>;
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        Chat with <strong>{state.otherUser?.name}</strong>
      </div>

      <div style={styles.messages}>
        {chat.messages.map((msg, i) => {
          const isMe = msg.sender === myId || msg.sender?._id === myId;

          return (
            <div
              key={i}
              style={{
                ...styles.message,
                alignSelf: isMe ? "flex-end" : "flex-start",
                background: isMe ? "#007bff" : "#e5e5e5",
                color: isMe ? "white" : "black"
              }}
            >
              {msg.text}
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      <div style={styles.inputBox}>
        <input
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type a message..."
          style={styles.input}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    width: "420px",
    margin: "30px auto",
    border: "1px solid #ccc",
    borderRadius: "8px",
    display: "flex",
    flexDirection: "column",
    height: "80vh"
  },
  header: {
    padding: "12px",
    borderBottom: "1px solid #ccc",
    textAlign: "center",
    fontWeight: "bold"
  },
  messages: {
    flex: 1,
    padding: "10px",
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "6px"
  },
  message: {
    padding: "8px 12px",
    borderRadius: "15px",
    maxWidth: "70%",
    wordWrap: "break-word"
  },
  inputBox: {
    display: "flex",
    padding: "10px",
    borderTop: "1px solid #ccc",
    gap: "5px"
  },
  input: {
    flex: 1,
    padding: "8px",
    borderRadius: "4px",
    border: "1px solid #ccc"
  },
  button: {
    padding: "8px 14px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "4px",
    cursor: "pointer"
  }
};

export default Chat;
