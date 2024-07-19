import { useState } from "react";
import NoteContext from "./NoteContext";

let NoteState = (props) => {
  let host = "http://localhost:2000";
  const notesInitial = [];

  let [notes, setNotes] = useState(notesInitial);
  let [tag, setTag] = useState("General");
  
  // GET ALL NOTES:
  const getAllNotes = async () => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NTcyZjU3NGZlZTA1ODJiMDMxMDg2In0sImlhdCI6MTcyMTExMDI5MH0.muMCtPuBvN0B-mvUaHkQLZ4LGgHnFyIip9GEkOc10DE",
      },
    });
    const json = await response.json();
    setNotes(json);
  };

  // Add a note
  const addNote = async (title, description, tag) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NTcyZjU3NGZlZTA1ODJiMDMxMDg2In0sImlhdCI6MTcyMTExMDI5MH0.muMCtPuBvN0B-mvUaHkQLZ4LGgHnFyIip9GEkOc10DE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    const note = {
      _id: new Date().getTime().toString(), // Use a unique id
      user: "669572f574fee0582b031081",
      title: title,
      description: description,
      tag: tag,
      date: new Date().toISOString(),
      __v: 0,
    };
    setNotes(notes.concat(note)); // Create a new array
  };
 
  
  // Delete a note
  let deleteNote = async (id) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NTcyZjU3NGZlZTA1ODJiMDMxMDg2In0sImlhdCI6MTcyMTExMDI5MH0.muMCtPuBvN0B-mvUaHkQLZ4LGgHnFyIip9GEkOc10DE",
      },
    });
   

    if (response.status === 200) {
      
      console.log("Note deleted successfully:", id);
      const newNotes = notes.filter((element) => {
        return element._id !== id;
      });
      setNotes(newNotes);
    } else {
      console.error("Failed to delete the note:", id);
    }
  };
  
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API CALL:
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjY5NTcyZjU3NGZlZTA1ODJiMDMxMDg2In0sImlhdCI6MTcyMTExMDI5MH0.muMCtPuBvN0B-mvUaHkQLZ4LGgHnFyIip9GEkOc10DE",
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    // Implement edit logic here
    const newNotes = notes.map((note) => {
      if (note._id === id) {
        note.title = title;
        note.description = description;
        note.tag = tag;
      }
      return note;
    });
    setNotes(newNotes);
  };

  return (
    <NoteContext.Provider
      value={{
        notes,
        setNotes,
        addNote,
        deleteNote,
        editNote,
        tag,
        setTag,
        getAllNotes,
       
      }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
