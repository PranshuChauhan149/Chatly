import React, { useContext, useEffect } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { UserContext } from "./context/UserContext";
import { io } from "socket.io-client";

const App = () => {
  const {
    user,
    currentUser,
    serverUrl,
    getAllUser,
    socket,
    setSocket,
    setOnlineUser,
  } = useContext(UserContext);

  useEffect(() => {
    currentUser();
    getAllUser();
  }, []);

  useEffect(() => {
    if (user) {
      const socketIo = io(serverUrl, {
        query: { userId: user._id },
      });
      setSocket(socketIo);

      socketIo.on("getOnlineUser", (users) => {
        setOnlineUser(users);
        console.log("Online users:", users);
      });

      return () => socketIo.close();
    } else {
      if (socket) {
        socket.close();
        setSocket(null);
      }
    }
  }, [user, serverUrl, setSocket, setOnlineUser]);

  return (
    <Routes>
      <Route path="/" element={user ? <Home /> : <Navigate to="/login" />} />
      <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
      <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
      <Route path="/profile" element={user ? <Profile /> : <Navigate to="/login" />} />
    </Routes>
  );
};

export default App;
