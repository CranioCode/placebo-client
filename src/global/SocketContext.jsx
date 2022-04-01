import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import AuthContext from "./auth/auth-context";

const SocketContext = createContext(); // global socket context

const useSocket = () => {
  return useContext(SocketContext); // custom hook to access context
};

// context provider
const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  const { user } = useContext(AuthContext);

  useEffect(() => {
    socket.current = io(import.meta.env.VITE_BACKEND_SOCKET, {
      withCredentials: true,
    });

    socket.current.on("connect", () => console.log("socket connetion"));

    socket.current.on("disconnect", () => console.log("disconnected"));
  }, [user?._id]);

  return (
    <SocketContext.Provider value={socket}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
