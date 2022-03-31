import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
// import Cookies from "js-cookie"; 

const SocketContext = createContext(); // global socket context

const useSocket = () => {
  return useContext(SocketContext); // custom hook to access context
};

// context provider
const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  useEffect(() => {
    console.log(import.meta.env.VITE_BACKEND_SOCKET);
    socket.current = io(import.meta.env.VITE_BACKEND_SOCKET, {
      withCredentials: true,
    });

    socket.current.on("connect", () => console.log("socket connetion"));

    socket.current.on("disconnect", () => console.log("disconnected"));
  }, []);

  return (
    <SocketContext.Provider value={socket.current || "noSocketContext"}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
