import React, { useState } from "react";
import { IoLogoWechat } from "react-icons/io5";
import { IoIosEye, IoMdEyeOff } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
const Signup = () => {
  const { serverUrl, setUser } = useContext(UserContext);
  const [showPassword, setShowPassword] = useState(false);
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
const navigate = useNavigate();
  const handleSignUp = async (e) => {
    try {
      e.preventDefault();
      setLoading(true);
      const res = await axios.post(
        `${serverUrl}/api/auth/Signup`,
        { userName, email, password },
        { withCredentials: true }
      );
      console.log(res.data);

      setUser(res.data);
      setUserName("");
      setEmail("");
      setPassword("");
      setLoading(false);
      navigate("/");
    } catch (error) {
      console.log(error);

      setLoading(false);
    }
  };
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <div className="w-[400px] h-[500px] flex flex-col bg-pink-200 rounded-lg  items-center  gap-5">
        <div className="w-full h-[30%] rounded-b-[40%] bg-pink-500 flex items-center justify-center ">
          <div className=" flex items-center justify-center flex-col gap-4">
            <p className="text-2xl font-bold  ">Welcome to chatly</p>
            <IoLogoWechat className="text-5xl text-white" />
          </div>
        </div>
        <div className="w-full flex flex-col gap-5 px-10">
          <div className="w-full flex gap-1.5 flex-col ">
            <p className="text-gray-900 font-medium"> Enter Your userName</p>
            <input
              type="text"
              name=""
              id=""
              className="bg-white rounded-lg outline-none  p-1"
              onChange={(e) => {
                setUserName(e.target.value);
              }}
              value={userName}
            />
          </div>
          <div className="w-full flex gap-1.5 flex-col ">
            <p className="text-gray-900 font-medium"> Enter Your Email</p>
            <input
              type="email"
              name=""
              id=""
              className="bg-white rounded-lg outline-none  p-1"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              value={email}
            />
          </div>
          <div className="w-full flex gap-1.5 flex-col relative">
            <p className="text-gray-900 font-medium"> Enter Your Password</p>
            <input
              type={showPassword ? "text" : "password"}
              name=""
              id=""
              className="bg-white rounded-lg outline-none  p-1"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              value={password}
            />
            {showPassword ? (
              <IoMdEyeOff
                className="absolute right-4 top-9.5 text-lg hover:cursor-pointer"
                onClick={() => setShowPassword(false)}
              />
            ) : (
              <IoIosEye
                className="absolute right-4 top-9.5 text-lg hover:cursor-pointer"
                onClick={() => setShowPassword(true)}
              />
            )}
          </div>
          <div className="w-full flex flex-col gap-1 justify-center items-center">
            <button
              className="  w-full bg-pink-500 rounded-lg p-2 text-gray-100 hover:shadow-gray-500 hover:shadow-lg hover:cursor-pointer"
              onClick={handleSignUp}
            >
              submite
              
            </button>
            <p className="text-gray-900">
              Already account{" "}
              <span className="font-bold hover:cursor-pointer" onClick={()=>navigate("/login")}>Login</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
