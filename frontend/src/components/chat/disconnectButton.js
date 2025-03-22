import React from "react";
import { Tooltip } from "antd";
import Image from "next/image";

import { useChatSystemContext } from "@/hooks/use-chat-system-context";

import leave_tooltip from "@/assets/icons/chat/leave_tooltip.svg";

const DisconnectBtn = () => {
  const { updateState } = useChatSystemContext();

  return (
    <Tooltip
      overlayClassName="copylink-tooltip"
      title={<Image src={leave_tooltip} alt="leave_tooltip" />}
    >
      <button
        className="disconnect-btn"
        onClick={() => updateState("showChatLeaveModal", true)}
      >
        <p className="chat-text">Disconnect</p>
      </button>
    </Tooltip>
  );
};

export default DisconnectBtn;
