import { useState } from 'react';
import NoteContext from './NoteContext';

let NoteState = (props) => {
  const notesInitial = [
    {
      "_id": "669684337486cb27fc63df90",
      "user": "669572f574fee0582b031086",
      "title": "kasu sathi jevan",
      "description": "Date-03",
      "tag": "Personal",
      "date": "2024-07-16T14:31:15.839Z",
      "__v": 0
    },
    {
      "_id": "669684477486cb27fc63df92",
      "user": "669572f574fee0582b031086",
      "title": "javai la jevan",
      "description": "Date-04",
      "tag": "Personal",
      "date": "2024-07-16T14:31:35.850Z",
      "__v": 0
    },
    {
      "_id": "6697d5157e0d9d9af9a13e53",
      "user": "669572f574fee0582b031086",
      "title": "Complete Narayani Serial",
      "description": "Hello baby how are you! Yes i Am fine",
      "tag": "General",
      "date": "2024-07-17T14:28:37.412Z",
      "__v": 0
    }
  ];

  let [notes, setNotes] = useState(notesInitial);
  let [tag, setTag] = useState('General');

  // Add a note 
  const addNote = (title, description, tag) => {
    //API CALL
    const note = {
      "_id": new Date().getTime().toString(), // Use a unique id
      "user": "669572f574fee0582b031081",
      "title": title,
      "description": description,
      "tag": tag,
      "date": new Date().toISOString(),
      "__v": 0
    };
    setNotes(notes.concat(note)); // Create a new array
  }

  // Delete a note
  let deleteNote = (id) =>{
  //API CALL
    // Implement delete logic here
    console.log("Deleting Note : ",id);
    const newNotes = notes.filter((element)=>{ return element._id!==id})
    setNotes(newNotes);
  }

  // Edit a note
  const editNote = (id,title,description,tag) => {
    // Implement edit logic here
  }

  return (
    <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote, tag, setTag }}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteState;
