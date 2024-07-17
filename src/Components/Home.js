import React, { useContext } from "react";
import "../App.css";
import NoteContext from "../Context/Notes/NoteContext";
import Notes from "./Notes";
import TagDropdown from "./TagDropdown";

function Home() {
  const context = useContext(NoteContext);
  let { notes, setNotes } = context;

  return (
    <>
      <div className="container">
        <form style={{border : '1px solid black',padding:'20px',borderRadius:'10px'}}>
          <div className="mb-3">
            <label
              htmlFor="titleInputLabel exampleInputEmail1"
              className="form-label"
            >
              <strong>Title</strong>
            </label>
            <input
              type="email"
              className="form-control"
              id="titleInput"
              aria-describedby="emailHelp"
            />
            <div id="emailHelp" className="form-text">
              You're privacy is in our hands!
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="descriptionInput" className="form-label">
              <strong>Description</strong>
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1 descriptionInput"
            />
          </div>
          <TagDropdown/>
          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>
        <div className="my-3">
          <h2>Your notes:</h2>
          {notes.map((note, index) => {
            return (
              <Notes
                key={index} // Using index as key
                title={note.title}
                tag={note.tag}
                description={note.description}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
