import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/Notes/NoteState";
import Login from "./Components/Login";
import Signup from "./Components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path="/Navbar" element={<Navbar />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/About" element={<About />} />
            <Route exact path ="/Login" element={<Login/>}></Route>
            <Route exact path = "/Signup" element={<Signup/>}></Route>
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
