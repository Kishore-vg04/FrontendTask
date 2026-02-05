import React from 'react'
import './Requesthelp.css'
import { useState } from 'react'
function Requesthelp() {
    const [name,setName] = useState("");
    const [email,setEmail] = useState("");
    const [problem,setProblem] = useState("");
    const [message,setMessage] = useState("");

    const handlerequest = ()=>{
        fetch('http://localhost:5000/api/auth/postrequest',{
            method:"POST",
            headers:{"Content-Type":"application/json"},
            body:JSON.stringify({name,email,problem})
        }).then(res=>res.json())
        .then(data=>setMessage(data.message))
        .catch(err=>setMessage(err.message));
    }
  return ( 
    <div>
        <div className='requestcontainer'> 
            <div>Name: <input type="text" placeholder='Name' onChange={(e)=>setName(e.target.value)}/></div>
            <div>Email: <input type="text" placeholder='Email' onChange={(e)=>setEmail(e.target.value)}/></div>
            <div>Problem: <input type="text" placeholder='Seeking Help For' onChange={(e)=>setProblem(e.target.value)}/></div>
            <button onClick={handlerequest}>Request</button>
        </div>
        <div>
            <p style={{marginTop:'10px'}}>{message}</p>
        </div>
    </div>
  )
}

export default Requesthelp