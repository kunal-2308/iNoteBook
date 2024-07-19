import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Components/Home";
import About from "./Components/About";
import NoteState from "./Context/Notes/NoteState";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route exact path="/Navbar" element={<Navbar />} />
            <Route exact path="/" element={<Home />} />
            <Route exact path="/About" element={<About />} />
          </Routes>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
