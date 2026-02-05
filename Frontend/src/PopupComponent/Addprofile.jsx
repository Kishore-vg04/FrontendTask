import React from 'react'
import './Addprofile.css'
import { useState } from 'react'
function Addprofile() {
  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [role,setRole] = useState("")
  const [message,setMessage] = useState("");
  const [skill,setSkill] = useState("");
  const [image,setImage] = useState("")

  const handleSubmit = () => {
        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("role", role);
        formData.append("skill", skill);
        if(image) formData.append("image", image);

        fetch("http://localhost:5000/api/auth/register", {
            method: "POST",
            body: formData, 
        })
            .then(res => res.json())
            .then(data => setMessage(data.message))
            .catch(err => {
            console.error(err);
            setMessage("Something went wrong!");
            });
        };

  return (
    <div>
      <div className='input-main'>
        <div className='input'>
          <label htmlFor="name">Name: </label>
          <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
        </div>
        <div className='input'>
          <label htmlFor="email">Email: </label>
          <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
        </div>
        <div className='input'>
          <label htmlFor="password">Password: </label>
          <input type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
        </div>
        <div className='input'>
          <label htmlFor="role">Role: </label>
          <input type="text" placeholder='Role' onChange={(e)=>setRole(e.target.value)}/>
        </div>
        <div className='input'>
          <label htmlFor="skill">Skill: </label>
          <input type="text" placeholder='Skill' onChange={(e)=>setSkill(e.target.value)}/>
        </div>
        <div className='input'>
          <label htmlFor="image">Profile: </label>
          <input type="file" onChange={(e)=>setImage(e.target.files[0])}/>
        </div>
        <div className='input'>
          <button onClick={handleSubmit}>Add User</button>
        </div>
      </div>
      {<h3 style={{alignItems:'center'}}>{message}</h3>}
    </div>
  )
}

export default Addprofile