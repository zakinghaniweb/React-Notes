import { FaPlus } from "react-icons/fa"
import "./Home.css"
import PopUp from "../../Components/PopUp/PopUp"
import { useState } from "react"


const Home = () => {
  const [showPop,setShowPop] =  useState(false)
  return (
    <div className="w-full h-full">
      <div className="card-notes">
        <div className="addnote" onClick={()=>setShowPop(!showPop)}>
          <h2>Add <FaPlus/></h2>
        </div>
      </div>
        <PopUp showpopup={showPop} popclose={()=>setShowPop(false)}/>
    </div>
  )
}

export default Home