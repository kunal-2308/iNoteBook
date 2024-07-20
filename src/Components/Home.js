import React, { useContext, useEffect, useState, useRef } from "react";
import "../App.css";
import NoteContext from "../Context/Notes/NoteContext";
import Notes from "./Notes";
import TagDropdown from "./TagDropdown";

function Home() {
  const context = useContext(NoteContext);
  const { notes, addNote, tag, getAllNotes, editNote } = context;

  useEffect(() => {
    getAllNotes();
  }, []);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [etitle, esetTitle] = useState("");
  const [edesc, esetDesc] = useState("");
  const [etag, esetTag] = useState("");
  const [note, setNote] = useState({ id: "", eTitle: "", eDesc: "", eTag: "" });
  const [eId, seteId] = useState("");

  const handleChangeTitle = (evt) => {
    setTitle(evt.target.value);
  };

  const handleChangeDesc = (evt) => {
    setDesc(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    addNote(title, desc, tag);
    setTitle("");
    setDesc("");
  };

  const ref = useRef(null);
  const refClose = useRef(null);

  // UPDATE NOTE FUNCTIONS BELOW:
  const handleChangeeTitle = (evt) => {
    const value = evt.target.value;
    esetTitle(value);
    setNote((prevNote) => ({ ...prevNote, eTitle: value }));
  };

  const handleChangeeDesc = (evt) => {
    const value = evt.target.value;
    esetDesc(value);
    setNote((prevNote) => ({ ...prevNote, eDesc: value }));
  };

  const handleChangeeTag = (evt) => {
    const value = evt.target.value;
    esetTag(value);
    setNote((prevNote) => ({ ...prevNote, eTag: value }));
  };

  const handleClick = (e) => {
    e.preventDefault();
    editNote(note.id, note.eTitle, note.eDesc, note.eTag);
    refClose.current.click();
  };

  const updateNote = (note) => {
    ref.current.click(); // Trigger the button click to open the modal
    esetTitle(note.title);
    esetDesc(note.description);
    esetTag(note.tag); // Set the existing tag
    seteId(note._id);
    setNote({ id: note._id, eTitle: note.title, eDesc: note.description, eTag: note.tag });
  };

  return (
    <>
      <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        ref={ref}
        style={{ display: "none" }}
      >
        Launch demo modal
      </button>

      {/* MODAL START */}
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form
                style={{
                  border: "1px solid black",
                  padding: "20px",
                  borderRadius: "10px",
                }}
              >
                <div className="mb-3">
                  <label htmlFor="etitleInput" className="form-label">
                    <strong>Title</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitleInput"
                    aria-describedby="titleHelp"
                    value={etitle}
                    onChange={handleChangeeTitle}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescriptionInput" className="form-label">
                    <strong>Description</strong>
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescriptionInput"
                    value={edesc}
                    onChange={handleChangeeDesc}
                  />
                </div>
                <TagDropdown value={etag} onChange={handleChangeeTag} />
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button type="button" className="btn btn-primary" onClick={handleClick}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <form
          style={{
            border: "1px solid black",
            padding: "20px",
            borderRadius: "10px",
          }}
          onSubmit={handleSubmit}
        >
          <div className="mb-3">
            <label htmlFor="titleInput" className="form-label">
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
          <TagDropdown value={tag} onChange={handleChangeeTag} />
          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>
        </form>
        <div className="my-3">
          <h2>Your notes:</h2>
          {Array.isArray(notes) &&
            notes.map((note) => {
              return (
                <Notes
                  key={note._id}
                  title={note.title}
                  tag={note.tag}
                  description={note.description}
                  id={note._id}
                  updateNote={updateNote}
                  note={note}
                />
              );
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
