import React from 'react'
import './Updateprofile.css'
import { useState } from 'react';

function Updateprofile() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [role,setRole] = useState("")
  const [message,setMessage] = useState("");
  const [skill,setSkill] = useState("");
  const [image,setImage] = useState("");

  const handleSubmit = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/update", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`
      },
      body: JSON.stringify({ name, email, role, skill })
    });

    const data = await res.json();
    setMessage(data.message);
  } catch (err) {
    setMessage("Update Failed");
    console.log(err.message);
  }
};


  return (
    <div>
        <div>
          <div>
            <div className='mains'>
              <div className='inputcontainer'>
                <label htmlFor="name">Name: </label>
                <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
              </div>
              <div className='inputcontainer'>
                <label htmlFor="email">Email: </label>
                <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
              </div> 
              <div className='inputcontainer'>
                <label htmlFor="skill">Skill: </label>
                <input type="text" placeholder='Skill' onChange={(e)=>setSkill(e.target.value)}/>
              </div>
              <div className='inputcontainer'>
                <label htmlFor="role">Role: </label>
                <input type="text" placeholder='Role' onChange={(e)=>setRole(e.target.value)}/>
              </div>
              <div className='inputcontainer'>
                <label htmlFor="image">Image: </label>
                <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
              </div>
              <div className='button' onClick={handleSubmit}>
                <button >Update Profile</button>
               </div>
            </div>
            <p style={{textAlign:'center'}}>{message}</p>
          </div>
        </div>
    </div>
  )
}

export default Updateprofile