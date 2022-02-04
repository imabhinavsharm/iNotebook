import NoteContext from "./noteContext";
import {useState} from "react";

const NoteState = (props) => {
  const host = "http://localhost:3001"
  const token =localStorage.getItem("authToken")
  // const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjFjY2E1ZWM0Mjc3ZTNlOTlkZjhkNWEwIn0sImlhdCI6MTY0MzQ2MjM5MH0.6k0e3_QhK7zuTotf4iz_JbkU0s1c8JWv4s37wGxjST0"
const notesInitial = []
  const [notes, setnotes] = useState(notesInitial)
// fetch all notes
const getNotes= async()=>{
  //todo api call
  const response = await fetch(`${host}/api/notes/fetchallnotes`,{
    method:'GET',
    headers:{
      'Content-Type': 'application/json',
      'auth-token': token
    }
    
      })
const json = await response.json()
setnotes(json)
}

// Add a note
const addNote= async(title,description,tag)=>{
  //todo api call
  const response = await fetch(`${host}/api/notes/addnote`,{
    method:'POST',
    headers:{
      'Content-Type': 'application/json',
      'auth-token': token
    },body:JSON.stringify({title,description,tag})
    
    
  })
const note = await response.json()
setnotes(notes.concat(note))
}


// delete a note
const deleteNote= async(id)=>{
//api call 
  const response = await fetch(`${host}/api/notes/deletenote/${id}`,{
    method:'DELETE',
    headers:{
      'Content-Type': 'application/json',
      'auth-token': token
    }
    
      })
      console.log(response.json());

const newNotes = notes.filter((note)=>{
 return note._id !==id
})
setnotes(newNotes)
  
}


// edit a note
const editNote= async(id,title,description,tag)=>{
  const response = await fetch(`${host}/api/notes/updatenote/${id}`,{
method:'PUT',
headers:{
  'Content-Type': 'application/json',
  'auth-token': token
},body:JSON.stringify({title,description,tag})

  })
  console.log(response.json());
  let newNotes = JSON.parse(JSON.stringify(notes))
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];
    if(element._id===id){
       newNotes[index].title=title
       newNotes[index].description= description
       newNotes[index].tag=tag
       break
      }
      
  }
  setnotes(newNotes)
}

    return (
       < NoteContext.Provider value={{notes,setnotes,addNote,deleteNote,getNotes,editNote}}>
       {props.children}
       </NoteContext.Provider>
    )
}

export default NoteState
