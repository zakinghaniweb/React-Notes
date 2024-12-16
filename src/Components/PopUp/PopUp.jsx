import { IoClose } from 'react-icons/io5'
import './PopUp.css'
import { IoIosColorPalette } from 'react-icons/io'
import { FaArrowDown, FaEyeDropper } from 'react-icons/fa'
import { useState } from 'react'
import { getDatabase, push, ref, set } from "firebase/database";

const PopUp = ({showpopup, popclose, popclear}) => {
    const db = getDatabase();
    const [noteData,setNoteData] = useState({noteName: "",noteDetails: "",noteError: ""})
    const handleSave = ()=>{
        if (!noteData.noteName) {
            setNoteData((prev)=>({...prev,noteError:"Your Note Must Have A Title"}))
        }
        else if (!noteData.noteDetails) {
            setNoteData((prev)=>({...prev,noteError:"Please Enter Some Note"}))
        }
        else{
            set(push(ref(db, 'allNotes/')), {
                noteTitle:noteData.noteName,
                noteDetails:noteData.noteDetails
            });
            popclose()
            setNoteData((prev)=>({...prev,noteName:""}))
            setNoteData((prev)=>({...prev,noteDetails:""}))
            setNoteData((prev)=>({...prev,noteError:""}))
            document.querySelector(".noteName").value = ""
            document.querySelector(".noteDetails").value = ""
        }
    }

return (
    <div id='popup' className={`${showpopup?'top-0 opacity-[1]':'top-[-100%] opacity-0'} transition-all duration-500`}>
        <div className="noteform">
            <div className="noteformrow">
                <div className="formHead flex justify-between">
                    <h2>Add Note</h2>
                    <button className='popupclose' onClick={popclose}><IoClose/></button>
                </div>
                <div className="formBody">
                    <h2>Note Name</h2>
                    <input type="text" onChange={(e)=>{setNoteData((prev)=>({...prev,noteName:e.target.value})),setNoteData((prev)=>({...prev,noteError:""}))}} className='noteName'/>
                    <h2 className='mt-5'>Note Details</h2>
                    <textarea className="noteDetails" onChange={(e)=>{setNoteData((prev)=>({...prev,noteDetails:e.target.value})),setNoteData((prev)=>({...prev,noteError:""}))}}></textarea>
                    <p className="name-error text-red-600 font-bold mt-2">{noteData.noteError}</p>
                </div>
                <div className="form-bottom flex justify-between mt-[30px]">
                    <div className="colors">
                        <IoIosColorPalette className='text-3xl text-gray-500' />
                        <button className="single-color bg-green-500"></button>
                        <button className="single-color bg-red-500"></button>
                        <button className="single-color bg-blue-500"></button>
                        <label className="single-color bg-black text-white" htmlFor='color'><FaEyeDropper /></label>
                        <input type="color" className="!bg-transparent !shadow-none" id='color'/>
                    </div>
                    <div className="saveNote">
                        <button onClick={handleSave}>Save <FaArrowDown/></button>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default PopUp