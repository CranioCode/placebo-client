import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";
import Cookies from "js-cookie";

const SocketContext = createContext(); // global socket context

const useSocket = () => {
  return useContext(SocketContext); // custom hook to access context
};

// context provider
const SocketProvider = ({ children }) => {
  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(process.env.REACT_APP_BACKEND_SERVER, {
      auth: {
        session: Cookies.get("session"),
      },
    });

    socket.current.on("connect", () => console.log("socket connetion"));

    socket.current.on("disconnect", () => console.log("disconnected"));
  }, []);

  return (
    <SocketContext.Provider value={socket.current}>
      {children}
    </SocketContext.Provider>
  );
};

export { SocketProvider, useSocket };
