import React, { useState } from 'react';
import './Home.css';
import { useNavigate } from 'react-router-dom';
import Showprofile from '../PopupComponent/Showprofile';
import Addprofile from '../PopupComponent/Addprofile';
import Updateprofile from '../PopupComponent/Updateprofile';
import Changepassword from '../PopupComponent/Changepassword';
import Viewallprofiles from '../PopupComponent/Viewallprofiles';
import Requesthelp from '../PopupComponent/Requesthelp';
import Providehelp from '../PopupComponent/Providehelp';
import ChatList from '../ChatComponent/ChatList'; 

function Home() {
  const navigate = useNavigate();
  const [popup, setPopup] = useState(""); 

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  const openPopup = (type) => setPopup(type);
  const closePopup = () => setPopup("");

  return (
    <div>
      {/* NAVBAR */}
      <div className="navbar">
        <div className="image">
          <img src="../src/assets/react.svg" alt="logo" />
          <h1 className="logo">NeighborNet</h1>
        </div>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>

      {/* BUTTON LIST */}
      <div className="list">
        <button onClick={() => openPopup("show")}>My User Profile</button>
        <button onClick={() => openPopup("add")}>Add New Profile</button>
        <button onClick={() => openPopup("update")}>Update User Profile</button>
        <button onClick={() => openPopup("requesthelp")}>Request Help</button>
        <button onClick={() => openPopup("providehelp")}>Provide Help</button>
        <button onClick={() => openPopup("password")}>Change Password</button>
        <button onClick={() => openPopup("viewall")}>View All profiles</button>
        <button onClick={() => openPopup("chats")}>My Chats</button>
      </div>

      {/* POPUP MODAL */}
      {popup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>
              {popup === "show" && "User Profile"}
              {popup === "add" && "Add New Profile"}
              {popup === "update" && "Update User Profile"}
              {popup === "requesthelp" && "Request Help"}
              {popup === "providehelp" && "Provide Help"}
              {popup === "password" && "Change Password"}
              {popup === "viewall" && "View All Profiles"}
              {popup === "chats" && "My Chats"} 
            </h2>
            
            {popup === "show" && <Showprofile />}
            {popup === "add" && <Addprofile />}
            {popup === "update" && <Updateprofile />}
            {popup === "requesthelp" && <Requesthelp />}
            {popup === "providehelp" && <Providehelp />}
            {popup === "password" && <Changepassword />}
            {popup === "viewall" && <Viewallprofiles />}
            {popup === "chats" && <ChatList />} 

            <button className="close-btn" onClick={closePopup}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Home;
