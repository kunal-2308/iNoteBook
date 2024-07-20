import React, { useState } from "react";
import {useNavigate} from 'react-router-dom';
function Login() {
  const [credentials,setCredentials] = useState({"email":"","password":""});
  let navigate = useNavigate();
  let handleSubmit = async(e)=>{
    e.preventDefault();
    const response = await fetch('http://localhost:2000/api/auth/login',{
      method:'POST',
      headers:{
        'Content-type':'application/json',
      },
      body :JSON.stringify(credentials),
    });

    let data = await response.json();
    if(data.success===true){
      //redirect to :
      //save the auth-token to localstorage:
      localStorage.setItem('token',data.authToken);
      navigate('/');
    }
  }

  let handleOnEChange = (e) =>{
    e.preventDefault();
    setCredentials((prevState)=>({
      ...prevState,
      "email" : e.target.value,
    }))
  };

  let handleOnPChange = (e) =>{
    e.preventDefault();
    setCredentials((prevState)=>({
      ...prevState,
      "password" : e.target.value,
    }))
  };


  return (
    <>
    
    <div className="container my-3">
    <h3>LOGIN </h3>
      <form  onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="Email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="Email"
            aria-describedby="emailHelp"

            onChange={handleOnEChange}
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="Password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            id="Password"
            onChange={handleOnPChange}
          />
        </div>
     
        
        <button type="submit" className="btn btn-primary">
          Login
        </button>
       
      </form>
      </div>
    </>
  );
}

export default Login;
