const express = require('express')
const router = express.Router()
var fetchuser = require('../middleware/fetchuser')
const Note = require('../models/Note')
const { body, validationResult } = require('express-validator');


// get all the notes of the user logged in 
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    const notes = await Note.find({user: req.user.id})
res.json(notes)
})


// route 2  add the  notes of the user logged in 
router.post('/addnote',fetchuser,[
    body('title', 'enter a valid title').isLength({ min: 3 }),
    body('description', 'description should be of atleast 5 characters').isLength({ min: 5 }),

], async(req,res)=>{
    try{
        const {title,description,tag} = req.body
        const notes = await Note.find({user: req.user.id})
    // res.json(notes)
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const note = new Note({
    title,description,tag,user:req.user.id
    })
    let savedNote = await note.save()
    res.json(savedNote)

    }catch(error){
        console.error(error.message)
        res.status(500).send("some error occured")
    }
})

// route 3 edit the  notes of the user logged in 

router.put('/updatenote/:id',fetchuser, async(req,res)=>{
const {title,description,tag} = req.body

// create a  new note
const newNote = {}
if(title){newNote.title=title}
if(description){newNote.description=description}
if(tag){newNote.tag=tag}

// find the updated note and update it
let note =  await Note.findById(req.params.id)
if(!note){
   return res.status(404).send('note found')
}
if(note.user.toString() !== req.user.id){
return res.status(401).send("NOT ALLOWED")
}
note = await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true})
res.json({note})
})

// route 4 delete the  notes of the user logged in 

router.delete('/deletenote/:id',fetchuser, async(req,res)=>{
    const {title,description,tag} = req.body
    
    // find the note to be deleted  and delete  it
    let note =  await Note.findById(req.params.id)
    if(!note){
       return res.status(404).send('note found')
    }
    // allow deletion when user owns thst note
    if(note.user.toString() !== req.user.id){
    return res.status(401).send("NOT ALLOWED")
    }
    note = await Note.findByIdAndDelete(req.params.id)
    res.json({"sucess": "note has been deleted"})
    })
module.exports= router