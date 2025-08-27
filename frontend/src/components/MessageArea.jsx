import React, { useContext, useEffect, useRef, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import { IoMdSend } from "react-icons/io";
import SenderMessage from "./SenderMessage";
import ReciverMessage from "./ReciverMessage";
import { UserContext } from "../context/UserContext";
import profileImage from "../assets/dp.jpg";
import { FaArrowLeft } from "react-icons/fa6";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const MessageArea = () => {
  const refImage = useRef(null);
  const { selectedUser,setSelectedUser, onlineUser,serverUrl ,socket} = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [allMessage, setAllMessage] = useState([]);
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  // ✅ Send Message
  const sendMessage = async (e) => {
    e.preventDefault();
    if (!message && !file) return;

    try {
      const formData = new FormData();
      formData.append("message", message);
      if (file) formData.append("image", file);

      const { data } = await axios.post(
        `${serverUrl}/api/messages/send/${selectedUser._id}`,
        formData,
        {
          withCredentials: true,
        }
      );

      if (data.success) {
        console.log(data);
        
        setAllMessage((prev) => [...prev, data.newMessage]);
        setMessage("");
        setFile(null);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(()=>{
socket.on("getMessage",(mess)=>{
  setAllMessage([...allMessage,mess])
})
return ()=>socket?.off("getMessage")
  },[allMessage,setAllMessage])

  // ✅ Get All Messages
  const getMessage = async () => {
    try {
      const { data } = await axios.get(
        `${serverUrl}/api/messages/get-message/${selectedUser._id}`,
        { withCredentials: true }
      );
console.log(data);

      if (data.findMessage?.messages) {

        setAllMessage(data.findMessage.messages);
      } else {
        setAllMessage([]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (selectedUser?._id) getMessage();
  }, [selectedUser]);

  // ✅ Auto scroll to bottom
  const messagesEndRef = useRef(null);
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [allMessage]);

  return (
    <div className="w-full h-screen relative">
      {/* Header */}
      <div className="flex items-center gap-5 p-5 bg-pink-500">
        <FaArrowLeft className="text-xl hover:cursor-pointer " onClick={()=>setSelectedUser(null)}/>
        
        <div  className="w-[40px] h-[40px] bg-white rounded-full overflow-hidden relative">
          
          <img
            src={selectedUser.image || profileImage}
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
           {onlineUser.includes(selectedUser._id) ? <div className="bg-green-500 w-3 h-3 rounded-full absolute left-23 top-11.5 "></div> : ""}
       <div className="items-center justify-center">
         <p className="text-xl font-semibold text-gray-900">
          {selectedUser.userName}
        </p>
        {onlineUser.includes(selectedUser._id) ? <div className="text-white font-semibold text-xs">online</div> : <div className="text-gray-600 font-semibold text-xs">offline</div>}
       </div>
      </div>
      <div className="w-full h-0.5 bg-yellow-50"></div>

      {/* Messages */}
      <div className="h-[80%] lg:h-[75%] overflow-auto p-4">
        {allMessage.length > 0 ? (
          allMessage.map((item, index) =>
            item.sender === selectedUser._id ? (
              <ReciverMessage
                key={index}
                message={item.message}
                image={item.image}
              />
            ) : (
              <SenderMessage
                key={index}
                message={item.message}
                image={item.image}
              />
            )
          )
        ) : (
          <p className="text-center text-gray-500">No messages yet</p>
        )}
        <div ref={messagesEndRef}></div>
      </div>

      {/* Input box */}
      <form
        onSubmit={sendMessage}
        className="absolute bottom-2 w-full flex items-center justify-between px-4"
      >
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-[70%] lg:w-[80%] h-12 rounded-l-full bg-pink-300 outline-none text-xl text-white font-semibold px-7"
          placeholder="message..."
        />

        {/* Image Preview */}
        {file && (
          <div className="absolute right-28 bottom-16 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden shadow-md">
            <img
              src={URL.createObjectURL(file)}
              alt="preview"
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Actions */}
        <div className="w-[30%] lg:w-[20%] h-12 flex gap-5 items-center bg-pink-300 rounded-r-full px-5">
          {/* Image Upload */}
          <CiImageOn
            className="text-gray-900 text-2xl cursor-pointer"
            onClick={() => refImage.current?.click()}
          />
          <input
            type="file"
            hidden
            accept="image/*"
            ref={refImage}
            onChange={(e) => setFile(e.target.files[0])}
          />

          {/* Send Button */}
          <button type="submit">
            <IoMdSend className="text-gray-900 text-2xl cursor-pointer" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default MessageArea;
