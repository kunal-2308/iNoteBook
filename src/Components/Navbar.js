import React, { useContext, useEffect } from 'react'
import { Link,useLocation } from 'react-router-dom'
import NoteContext from '../Context/Notes/NoteContext';
function Navbar() {
  let location = useLocation();
  let context = useContext(NoteContext);
  const {getUser,userName,setUserName} = context
  useEffect(()=>{
    getUser();
  },[])

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className= "container-fluid">
    <Link className= "navbar-brand" to="/">iNoteBook</Link>
    <button className= "navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className= "navbar-toggler-icon"></span>
    </button>
    <div className= "collapse navbar-collapse" id="navbarSupportedContent">
      <ul className= "navbar-nav me-auto mb-2 mb-lg-0">
        <li className= "nav-item" >
          <Link className= {`nav-link ${location.pathname==='/'?'active':''}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className= "nav-item">
          <Link className= {`nav-link ${location.pathname==='/About'?'active':''}`} to="/About">About</Link>
        </li>
      </ul>
      <form className= "d-flex" role="search">
        <p className='my-2 mx-2'><strong>Hi,{userName}!</strong></p>
        <Link to="/Login"><button className= "btn btn-primary mx-2" type="button">Login</button></Link>
        <Link to="/Signup"><button className= "btn btn-primary mx-2" type="button">SignUp</button></Link>
      </form>
    </div>
  </div>
</nav>
    </>
  )
}

export default Navbar
