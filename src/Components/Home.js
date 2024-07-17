import React, { useContext, useState } from "react";
import "../App.css";
import NoteContext from "../Context/Notes/NoteContext";
import Notes from "./Notes";
import TagDropdown from "./TagDropdown";

function Home() {
  const context = useContext(NoteContext);
  let { notes, addNote, tag } = context;

  let [title, setTitle] = useState('');
  let [desc, setDesc] = useState('');

  let handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
  }

  let handleChangeDesc = (evt) => {
    setDesc(evt.target.value);
  }

  let handleSubmit = (evt) => {
    evt.preventDefault(); // Prevent form submission
    addNote(title, desc, tag);
    setTitle(''); // Clear the input fields
    setDesc('');
  }

  return (
    <>
      <div className="container">
        <form style={{ border: '1px solid black', padding: '20px', borderRadius: '10px' }} onSubmit={handleSubmit}>
          <div className="mb-3">
            <label
              htmlFor="titleInput"
              className="form-label"
            >
              <strong>Title</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="titleInput"
              aria-describedby="titleHelp"
              value={title}
              onChange={handleChangeTitle}
            />
            <div id="titleHelp" className="form-text">
              Your privacy is in our hands!
            </div>
          </div>
          <div className="mb-3">
            <label htmlFor="descriptionInput" className="form-label">
              <strong>Description</strong>
            </label>
            <input
              type="text"
              className="form-control"
              id="descriptionInput"
              value={desc}
              onChange={handleChangeDesc}
            />
          </div>
          <TagDropdown />
          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>
        <div className="my-3">
          <h2>Your notes:</h2>
          {Array.isArray(notes) && notes.map((note) => {
            return (
              <Notes
                key={note._id} // Use a unique key
                title={note.title}
                tag={note.tag}
                description={note.description}
                id={note._id}
              />
            );
          })}
        </div>
      </div>
    </>
  );
}

export default Home;
