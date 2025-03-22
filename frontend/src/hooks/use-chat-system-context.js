import { useContext } from "react";

import { ChatSystemContext } from "@/contexts/chat-system-context";

export const useChatSystemContext = () => {
  const context = useContext(ChatSystemContext);

  if (!context) {
    throw new Error(
      "useChatSystemContext must be used within a ChatSystemContextProvider"
    );
  }

  return context;
};
