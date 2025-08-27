import React from 'react'
import dp from "../assets/dp.jpg"

const ReciverMessage = ({message,image}) => {
  return (
      <div className="flex mt-5 items-start flex-col px-4 my-2 ">
           {image && <div className="bg-pink-300 text-black px-4 py-2 rounded-2xl min-w-[170px] h-[140px] mb-4 shadow-md">
             <img className="w-full h-full rounded-2xl object-cover" src={image} alt="" />
           </div>}
          {
        message &&  <div className="bg-pink-300 text-black px-4 py-2 rounded-2xl max-w-xs shadow-md">
             {message}
           </div>}
         </div>
  )
}

export default ReciverMessage