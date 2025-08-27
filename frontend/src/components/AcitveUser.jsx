import React, { useContext, useState, useEffect } from "react";
import profilePic from "../assets/dp.jpg";
import { UserContext } from "../context/UserContext";

const ActiveUser = () => {
  const { onlineUser, allUser ,setSelectedUser} = useContext(UserContext);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    if (allUser && onlineUser) {
      // filter only users whose _id exists in onlineUser list
      const filtered = allUser.filter((item) => onlineUser.includes(item._id));
      setOnlineUsers(filtered);
    }
  }, [allUser, onlineUser]);

  console.log("Online Users:", onlineUsers);

  return (
    <div className="flex w-full h-[90px] p-2 gap-4 overflow-auto no-scrollbar">
      {onlineUser && onlineUsers.map((item, index) => (
        <div key={index} className="flex flex-col items-center relative" onClick={()=>setSelectedUser(item)}>
          <img
            src={item.image || profilePic}
            className="w-[40px] h-[40px] rounded-full object-cover"
            alt=""
          />
          <div className="bg-green-500 w-3 h-3 rounded-full absolute right-0 top-6.5"></div>
          <p className="text-sm">{item.userName}</p>
        </div>
      ))}
      <p className="text-xl font-bold text-gray-800 ml-4 ">No online User... </p>
    </div>
  );
};

export default ActiveUser;
