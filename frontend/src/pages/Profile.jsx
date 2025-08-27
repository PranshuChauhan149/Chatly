import React, { useContext, useRef, useState } from "react";
import profileDp from "../assets/dp.jpg";
import { FaCamera } from "react-icons/fa";
import { UserContext } from "../context/UserContext";
import axios from "axios";

const Profile = () => {
  const { user, setUser, serverUrl } = useContext(UserContext);
  const [frontendImage, setFrontendImage] = useState("");
  const [backendImage, setBackendImage] = useState();
  const rf = useRef(null);

  const hadlefileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setBackendImage(file);
    setFrontendImage(URL.createObjectURL(file));
  };

  const handleProfile = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("image", backendImage);

      const res = await axios.put(`${serverUrl}/api/auth/profile`, formData, {
        withCredentials: true,
      });

      if (res) {
        console.log("cvkbl");
        
        console.log(res.data);
        setUser(res.data.user); // user context update कर दे
      }
    } catch (error) {
      console.error("profile update error:", error);
    }
  };

  return (
    <div className="w-full h-screen bg-pink-300 flex justify-center items-center">
      <div className="w-[400px] h-[500px] bg-white flex flex-col items-center p-6 gap-6 rounded-2xl shadow-lg">
        {/* Profile Image */}
        <div className="w-[150px] h-[150px] relative">
          <img
            src={user.image || profileDp}
            className="w-full h-full object-cover rounded-full border-4 border-pink-400"
            alt="Profile"
          />
          <FaCamera
            className="absolute bottom-3 right-4 text-2xl text-pink-600 cursor-pointer hover:scale-110 transition"
            onClick={() => rf.current.click()}
          />
          <input
            type="file"
            accept="image/*"
            onChange={hadlefileChange}
            ref={rf}
            hidden
          />
        </div>

        {/* Inputs */}
        <div className="w-full flex flex-col gap-5 px-6">
          <div className="flex flex-col gap-1">
            <p className="text-gray-900 font-medium">Your Name</p>
            <input
              value={user.userName}
              readOnly
              type="text"
              className="bg-pink-100 rounded-lg outline-none p-2 focus:ring-2 focus:ring-pink-400"
            />
          </div>
          <div className="flex flex-col gap-1">
            <p className="text-gray-900 font-medium">Your Email</p>
            <input
              type="email"
              className="bg-pink-100 rounded-lg outline-none p-2 focus:ring-2 focus:ring-pink-400"
              value={user.email} readOnly
            />
          </div>
        </div>

        {/* Button */}
        <div className="w-full flex justify-center mt-4">
          <button
            className="w-full bg-pink-500 rounded-lg p-2 text-white font-medium hover:bg-pink-600 hover:shadow-lg transition"
            onClick={handleProfile}
          >
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
