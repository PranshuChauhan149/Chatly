import React, { useContext, useState } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { HiOutlineDotsVertical } from "react-icons/hi";
import AcitveUser from "./AcitveUser";
import { UserContext } from "../context/UserContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import profileDp from "../assets/dp.jpg";

const LeftSideBar = () => {
  const navigate = useNavigate();
  const { selectedUser,setSelectedUser,onlineUser, serverUrl, setUser,user,allUser } = useContext(UserContext);
  const [showBox, setShowBox] = useState(false);  // ✅ corrected

const handleLogout = async () => {
  try {
    const res = await axios.post(
      `${serverUrl}/api/auth/logout`,
      {}, 
      { withCredentials: true }
    );

    if (res.data.success) {
      setUser(null);
      navigate("/login");
    }
  } catch (error) {
    console.log("Logout error:", error);
  }
};


  return (
    <div
      className={`w-full lg:w-[30%] bg-white h-screen no-scrollbar overflow-auto border-l-2 border-black ${
        selectedUser ? "hidden" : ""
      } lg:block `}
    >
      <div className="w-full h-[30%] rounded-b-[40%] bg-pink-300 flex items-center flex-col gap-5">
        <div className="relative w-full p-5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <div className="w-[60px] h-[60px] bg-white rounded-full">
              <img src={user.image || profileDp} className="w-full object-cover h-full rounded-full" alt="" />
            </div>
            <p className="text-xl font-semibold text-gray-900 ">
              {user.userName}
            </p>
          </div>

          <div>
            <HiOutlineDotsVertical
              className="text-2xl text-white hover:cursor-pointer"
              onClick={() => setShowBox((prev) => !prev)} // ✅ toggle correct
            />
          </div>

          {showBox && ( // ✅ corrected
            <div className="absolute right-8 top-15">
              <div className="w-[100px] h-[120px] bg-white rounded-xl p-4 flex flex-col items-center justify-center gap-3 shadow-md">
                <p
                  className="text-sm font-semibold text-pink-600 cursor-pointer"
                  onClick={() => {
                    navigate("/profile");
                  }}
                >
                  Profile
                </p>

                {/* Divider line */}
                <div className="w-full border-b border-gray-300"></div>

                <p
                  className="text-sm font-semibold text-red-500 hover:text-red-600 cursor-pointer"
                   onClick={handleLogout}
                >
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-center flex-col gap-4">
          <p className="text-2xl font-bold">Welcome to chatly</p>
          <IoLogoWechat className="text-5xl text-white" />
        </div>

        <div className=" mt-10 lg:mt-2 w-full">
          <AcitveUser />
        </div>

        {/* Divider line */}
        <div className="w-full border-b border-gray-300"></div>
        <div className="w-full flex gap-1 flex-col p-3 ">
          
        
  {allUser && allUser.length > 0 ? (
  allUser.map((item, index) => (
    <div onClick={()=>setSelectedUser(item)}
      className="w-full h-[50px] flex items-center gap-4 px-3 bg-gray-200 rounded-lg hover:bg-gray-300 transition cursor-pointer"
      key={item._id || index} // ✅ use unique id if available
    >
      <img
        className="w-12 h-12 object-cover rounded-full border border-gray-300"
        src={item.image || profileDp}
        alt={item.userName}
      />

      <div className="flex flex-col leading-tight">
        <p className="font-medium text-gray-800">{item.userName}</p>
      {
        onlineUser.includes(item._id) ? <div className="text-green-500 font-semibold text-xs">online</div> : <div className="text-red-500 font-semibold text-xs">offline</div>
      }
      </div>
    </div>
  ))
) : (
  <p className="text-gray-500">No users found</p>
)}


          
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
