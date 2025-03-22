"use client";

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

import { SocketContext } from "@/contexts/socket-context";

const SOCKET_URL = process.env.NEXT_PUBLIC_SOCKET_URL;

export const SocketContextProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io(SOCKET_URL);
    setSocket(socketInstance);

    return () => {
      socketInstance.disconnect();
    };
  }, []);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};
