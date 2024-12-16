import React, { useEffect, useState } from 'react'
import './SingleNote.css'
import { getDatabase, ref, onValue } from "firebase/database";

const SingleNote = () => {
// firebase vars
const db = getDatabase();
// State Datas
    const [allNotes,setAllNotes] = useState([])
// Functions ==>
    useEffect(() => {
        onValue(ref(db, 'allNotes/'), (snapshot) => {
            const array = []
            snapshot.forEach((item)=>{
                array.push(item.val())
            })
            setAllNotes(array)
        });
    }, [])

  return (
    <div className='flex flex-wrap'>
        {
            allNotes.map((item)=>{
                return(
                <div className='single-note'>
                    <h2 className='noteTitle'>{item.noteTitle}</h2>
                    <p className='noteData'>{item.noteDetails}</p>
                </div>
                )
            })
        }
    </div>
  )
}

export default SingleNote