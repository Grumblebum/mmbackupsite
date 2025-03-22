"use client";

import { useState } from "react";

import { SessionTypeEnum } from "@/enums/session-type-enum";

import { ChatSystemContext } from "@/contexts/chat-system-context";

const initialState = {
  isWalletExist: true,
  showShareTooltip: false,
  isVerifiedCode: false,
  showAttachment: false,
  showUploadModal: false,
  isWalletConnected: false,
  showChatLeaveModal: false,
  showReportfileModal: false,
  showProjectModeTooltip: false,
  showCopiedNotification: false,
  isProjectModeOn: false,

  dropdownSelected: SessionTypeEnum.STANDARD,
  expiryTime: "",
  activeUser: "",

  connectWalletFunction: () => {},
  filedata: {},
  sessionData: {
    sessionURL: "",
    sessionId: "",
    sessionType: "",
    sessionSeurityCode: "",
  },
  sessionUsers: [],
};

export const ChatSystemContextProvider = ({ children }) => {
  const [state, setState] = useState(initialState);

  const updateState = (key, value) => {
    setState((prevState) => ({
      ...prevState,
      [key]: value,
    }));
  };

  const resetState = () => {
    setState(initialState);
  };

  const ChatSystemContextData = {
    ...state,
    updateState,
    resetState,
  };

  return (
    <ChatSystemContext.Provider value={ChatSystemContextData}>
      {children}
    </ChatSystemContext.Provider>
  );
};

export default ChatSystemContextProvider;
