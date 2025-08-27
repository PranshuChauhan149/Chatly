import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const serverUrl = "http://localhost:5000";
  const [user, setUser] = useState(null);
  const [onlineUser,setOnlineUser] = useState([])
  const [allUser, setAllUser] = useState([]);
  const [selectedUser, setSelectedUser] = useState(false);
const [socket,setSocket] = useState(false)
  const currentUser = async () => {
    try {
      const res = await axios.get(`${serverUrl}/api/auth/current`, {
        withCredentials: true,
      });
      console.log(res);
      
      if (res.data) {
        setUser(res.data?.user); // ✅ user object hi set hoga
        console.log("User logged in:", res.data);
      } else {
        setUser(null);
        console.log("Not logged in");
      }
    } catch (error) {
      console.log("Error fetching current user:", error.message);
      setUser(null);
    }
  };

const getAllUser = async()=>{
  try {
const {data} = await axios.get(serverUrl + "/api/auth/allUser",{withCredentials:true});
    if(data.success){

      console.log(data.allUser);
      
      setAllUser(data.allUser);
    }
    else{
      data.message
    }
  } catch (error) {
    console.log(error.message);
    
  }
}



  return (
    <UserContext.Provider
      value={{
        user,
        setUser,
        selectedUser,
        setSelectedUser,
        serverUrl,
        currentUser,
        getAllUser,
        allUser,
        setAllUser,
        socket,
        setSocket,
        onlineUser,
        setOnlineUser

      }}
    >
      {children}
    </UserContext.Provider>
  );
};
