import { useContext } from "react";

import { SocketContext } from "@/contexts/socket-context";

export const useSocketContext = () => {
  const context = useContext(SocketContext);

  if (!context) {
    throw new Error(
      "useSocketContext must be used within a SocketContextProvider"
    );
  }

  return context;
};
