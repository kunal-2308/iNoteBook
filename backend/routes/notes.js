const express = require("express");
const router = express.Router();
const fetchUser = require("../Middleware/fetchUser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

// ROUTE 1: Get all notes: GET '/api/notes/fetchallnotes': Login required
router.get("/fetchallnotes", fetchUser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal Server Error");
  }
});

// ROUTE 2: Add a new note: POST '/api/notes/addnote': Login required
router.post(
  "/addnote",
  fetchUser,
  [
    body("title", "Enter a valid title").isLength({ min: 3 }),
    body("description", "Description must be at least 5 characters").isLength({
      min: 5,
    }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      // If there are errors, return Bad Request and the errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });

      const savedNote = await note.save();

      res.json(savedNote);
    } catch (error) {
      console.error(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);


//Route 3 : Update the existing note : PUT (Login required) 'api/notes/updatenote/:id'
router.put('/updatenote/:id',fetchUser,
async(req,res)=>{
    const {title,description,tag} = req.body;
    //create a new newNote object 
    const newNote = {};
    if(title){newNote.title = title};
    if(description){newNote.description = description};
    if(tag){newNote.tag = tag};

    //find the note be to updated :
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
    res.json({note});
});

//Route 4 : Delete the existing note : Delete (Login required) 'api/notes/deletenote/:id'
router.delete('/deletenote/:id',fetchUser,
async(req,res)=>{
    //find the note be to delete it :
    let note = await Note.findById(req.params.id);
    if(!note){return res.status(404).send("Not Found")}

    //allow delteion only if owner owns this note 
    if(note.user.toString() !== req.user.id){
        return res.status(401).send("Not Allowed");
    }

    note = await Note.findByIdAndDelete(req.params.id)
    res.send("Success : Note has been deleted");
});



module.exports = router;
