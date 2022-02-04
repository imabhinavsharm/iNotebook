import React, { useContext, useState } from 'react'
import noteContext from '../context/notes/noteContext'

const Addnote = () => {
    const context = useContext(noteContext)
    const { addNote } = context
    const [errosInput, seterrosInput] = useState({ errorTitle: "", errorDescription: "" })
    const [note, setNote] = useState({ title: "", description: "", tag: "" })
    const handleClick = (e) => {
        e.preventDefault()
        if (note.title && note.description) {
            addNote(note.title, note.description, note.tag)
            setNote({ title: "", description: "", tag: "" })
            seterrosInput({ errorTitle: "", errorDescription: "" })
        } else {
            if (!note.title && !note.description) {
                seterrosInput({ errorTitle: "Please fill the Title", errorDescription: "please fill the description" })
                setTimeout(() => {
                    seterrosInput({ errorTitle: "", errorDescription: "" })
                }, 2000);

            }
            else {
                if (!note.description) {
                    seterrosInput({ errorDescription: "please fill the description" })
                    setTimeout(() => {
                        seterrosInput({ errorTitle: "", errorDescription: "" })
                    }, 2000);

                } else {
                    seterrosInput({ errorTitle: "Please fill the Title" })
                    setTimeout(() => {
                        seterrosInput({ errorTitle: "", errorDescription: "" })
                    }, 2000);
                }
            }
        }
    }
    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }
    return (
        <div className='container my-3'>
            <h3>Add your Notes</h3>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="Title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" name='title' aria-describedby="emailHelp"
                        onChange={onChange}
                        value={note.title}
                        required
                    />
                </div>
                <p style={{ color: "red" }}>{errosInput.errorTitle}</p>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" name='description'
                        onChange={onChange}
                        value={note.description}
                        required
                    />
                </div>
                <p style={{ color: "red" }}>{errosInput.errorDescription}</p>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name='tag'
                        onChange={onChange}
                        value={note.tag}
                    />
                </div>

                <button type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
            </form>
        </div>
    )
}

export default Addnote
