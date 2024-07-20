import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Signup() {
  let [credentials,setCredentials] = useState({"name":"","email":"","password":""});
  let navigate = useNavigate();

  let handleNChange = (e) =>{
    e.preventDefault();
    setCredentials((prevState)=>({
      ...prevState,
      "name" : e.target.value
    }))
  }

  let handleEChange = (e) =>{
    e.preventDefault();
    setCredentials((prevState)=>({
      ...prevState,
      "email" : e.target.value
    }))
  }

  let handlePChange = (e) =>{
    e.preventDefault();
    setCredentials((prevState)=>({
      ...prevState,
      "password" : e.target.value
    }))
  }

  let handleSubmit = async(e) =>{
    e.preventDefault();
    const response = await fetch('http://localhost:2000/api/auth/createuser',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body :JSON.stringify(credentials),
    });

    let data = await response.json();
    if (data.success) {
      alert('Account created successfully');
      localStorage.setItem('token',data.authToken);
      navigate('/Login');
    }
  }

  return (
   <div className="container">
    <form onSubmit={handleSubmit}>
    <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" id="name" aria-describedby="emailHelp" onChange={handleNChange}/>
   
  </div>

  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" id="email" aria-describedby="emailHelp" onChange={handleEChange}/>
    <div id="text" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" id="password" onChange={handlePChange}/>
  </div>
  
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
   </div>
  )
}

export default Signup
