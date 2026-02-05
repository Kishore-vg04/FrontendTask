import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './Login.css'

function Login() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [role,setRole] = useState("")
    const [message,setMessage] = useState("");
    const [skill,setSkill] = useState("");
    const [image,setImage] = useState("")

    const navigate = useNavigate();

    const handleRegister = () => {
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

    const handleLogin=()=>{
        fetch('http://localhost:5000/api/auth/login',{
            method: "POST",
            headers : {"Content-Type":"application/json"},
            body : JSON.stringify({name,email,password,role,skill})
        })
        .then(res=>res.json())
        .then((data) =>{
            if(data.token){
                localStorage.setItem("token",data.token);
                navigate("/home");
            }else{
                 setMessage(data.message);
            }
        }
    )
        .catch(err => {
            console.error(err);
            setMessage("Something went wrong!");
        })
    };

  return (
    <div className='main'>
        <div>
            <h1>AUTHENTICATE</h1>
        <div className='maincontainer'> 
            <div>
                <div className='inputcontainer'>
                    <label htmlFor="name">Username</label>
                    <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}/>
                </div>
                <div className='inputcontainer'>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/>
                </div>
                <div className='inputcontainer'>
                    <label htmlFor="password">Password</label>
                    <input type="text" placeholder='Password' onChange={(e)=>setPassword(e.target.value)}/>
                </div>
                <div className='inputcontainer'>
                    <label htmlFor="role">Role</label>
                    <input type="text" placeholder='role' onChange={(e)=>setRole(e.target.value)}/>
                </div>
                <div className='inputcontainer'>
                    <label htmlFor="skill">Skill</label>
                    <input type="text" placeholder='skill' onChange={(e)=>setSkill(e.target.value)}/>
                </div>
                <div className='inputcontainer'>
                    <label htmlFor="image">Upload Profile</label>
                    <input type='file' onChange={(e)=>setImage(e.target.files[0])}/>
                </div>
                <div className='login'>
                    <button onClick={handleRegister}>REGISTER</button>
                </div>
                <div className='login'>
                    <button onClick={handleLogin}>AUTHENTICATE</button>
                </div>
            </div>
            <div style={{textAlign:'center',padding:'20px'}}>
            {message}
            </div>
        </div>
        </div>
    </div>
  )
}

export default Login