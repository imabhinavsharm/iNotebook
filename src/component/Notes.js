import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import Noteitem from '../component/Noteitem'
import Addnote from './Addnote'
const Notes = () => {
  const context = useContext(noteContext)
  const { notes, getNotes, deleteNote,editNote } = context
  const [noteId, setnoteId] = useState('')
  const [note, setNote] = useState({id:"",etitle:" ",edescription:" ",etag:" "})
  const [deleteState, setdeleteState] = useState(false)
  const [chekEdit, setchekEdit] = useState(false)
  const ref = useRef(null)
  const ref2 = useRef(null)
  const ref3 = useRef(null)
  const ref4 = useRef(null)
  useEffect(() => {
    // eslint-disable-next-line 
    getNotes()
    
  }, [])

  const deletedNotecheck = () => {
    deleteNote(noteId)
    ref2.current.click()
    
    setdeleteState(true)
    setTimeout(() => {
      setdeleteState(false)
    }, 2000);
  }
  const deleteNoteModal = (id) => {
    ref.current.click()
    setnoteId(id)

  }
  const updateNote=(currentNote)=>{
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
    ref3.current.click()
  }
  const onChange=(e)=>{
    setNote({...note,[e.target.name]:e.target.value})
}
const handleClick=(e)=>{
  
  editNote(note.id,note.etitle,note.edescription,note.etag)
  setchekEdit(true)
  setTimeout(() => {
    setchekEdit(false)
  },2000);
  ref4.current.click()
}
  return (
    <>
      <Addnote />
      <button style={{ display: "none" }} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal2" ref={ref}>
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal2" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Are you sure to delete note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-footer">
              <button ref={ref2} type="button" className="btn btn-secondary" data-bs-dismiss="modal">No</button>
              <button type="button" className="btn btn-primary" onClick={deletedNotecheck}>Yes</button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <button ref={ref3} style={{display:"none"}} type="button" className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">
          Launch demo modal
        </button>

        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
              <form className='my-3'>
            <div className="mb-3">
                <label htmlFor="Title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name='etitle' aria-describedby="emailHelp"
                onChange={onChange}
                value={note.etitle}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>
                <input type="text" className="form-control" id="edescription" name='edescription'
                  onChange={onChange}
                  value={note.edescription}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>
                <input type="text" className="form-control" id="etag" name='etag'
                  onChange={onChange}
                  value={note.etag}
                />
            </div>
        </form>
              </div>
              <div className="modal-footer">
                <button ref={ref4} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button onClick={handleClick} type="button" className="btn btn-primary">Save changes</button>
              </div>
            </div>
          </div>
        </div>



        <div className='row my-6'>
       
        {
            deleteState===true ?  <p style={{color:"red"}}>item deleted sucessfully</p> :""
          
          }
       
        {
            chekEdit===true ?  <p style={{color:"green"}}>item edited sucessfully</p> :""
          
          }
          {notes.length!==0? <h3>Your notes</h3>:<h3> No notes to display</h3> }
          {
            notes.map((note) => {
              return <Noteitem key={note._id} deleteNoteModal={deleteNoteModal}
              updateNote={updateNote}
                note={note} />
            })
          }
        </div>
       
      </div>
    </>
  )
}

export default Notes
