import React, { useContext } from 'react'
import chatly from "../../public/25537.jpg"
import { UserContext } from '../context/UserContext'
import MessageArea from './MessageArea';
const RightSideBar = () => {
   const { user, setUser,selectedUser } = useContext(UserContext);
  return (
 
    <div className={` ${selectedUser ? "block" : "hidden"}  lg:flex w-full h-screen bg-white items-center justify-center`}>
      { !selectedUser && <div className="p-4 flex items-center justify-center gap-2 flex-col">
        <img src={chatly}  className='w-[200px]' alt="" />
<p className="text-2xl font-bold text-pink-600 tracking-wide drop-shadow-md">
  Welcome to Chatly
</p>
      </div>}

      {
        selectedUser && <MessageArea/>
      }

      
    </div>
  )
}

export default RightSideBar
