import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'
const Noteitem = (props) => {
    // const context = useContext(noteContext)
    // const {deleteNote } = context
    // const handleDelete=(id)=>{
    //    deleteNote(id)
    // }
    const {note,deleteNoteModal,updateNote} = props
    return (<>
        <div className='col-md-3'>
            <div className="card my-3">
                <div className="card-body">
                    <div className='d-flex  align-items-center justify-content-center '>
                    <h2 className="card-text">
                        {note.title}
                    </h2>
                    <i className="fa fa-trash mx-2" onClick={()=>deleteNoteModal(note._id)} aria-hidden="true"></i>
                    <i className="fa fa-pencil-square mx-2" aria-hidden="true" onClick={()=>updateNote(note)}></i>

                    </div>
                    <p className='card-text'>{note.description}</p>
                </div>
            </div>
        </div>
    
    
    </>

    )
}

export default Noteitem
