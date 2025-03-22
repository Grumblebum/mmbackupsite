import React from "react";
import Image from "next/image";

import SelectedFileView from "../chat-components/selected-file";
import CommandModal from "./commandModal";

import arrow from "@/assets/icons/chat/open_right.svg";

const MessageInput = ({
  showAttachment,
  input,
  handleInputChange,
  handleClickSendBtn,
  sendBtn,
  sendBtnGrey,
  isDisabled,
  KeyboardType,
  showCommands,
  selectedCommands,
  isTimerCommand,
  commandModalRef,
  handleKeyDown,
  InputFieldDisabled,
  userlist,
  commandlist,
  handleSelectedCommand,
  handleSelectedUser,
  isRemoveCommand,
  selectedIndex,
  setSelectedColor,
  setShowCommands,
}) => {
  return (
    <div
      className={
        showAttachment ? "chat-input-cont-no-flex " : "chat-input-cont"
      }
    >
      <CommandModal
        showCommands={showCommands}
        selectedCommands={selectedCommands}
        userlist={userlist}
        showAttachment={showAttachment}
        commandlist={commandlist}
        input={input}
        handleSelectedCommand={handleSelectedCommand}
        handleSelectedUser={handleSelectedUser}
        isRemoveCommand={isRemoveCommand}
        selectedIndex={selectedIndex}
        setSelectedColor={setSelectedColor}
        setShowCommands={setShowCommands}
        key={"command-modal"}
      />
      <div className="input-cont" ref={commandModalRef}>
        <Image src={arrow} id="arrow-icon" alt="arrow" />
        <input
          value={input}
          onChange={handleInputChange}
          id={
            showCommands || isTimerCommand || selectedCommands !== ""
              ? "input-active"
              : undefined
          }
          onKeyDown={handleKeyDown}
          type={KeyboardType}
        />
        <Image
          src={!isDisabled && input.length > 0 ? sendBtn : sendBtnGrey}
          onClick={handleClickSendBtn}
          id="send-btn"
          alt="sendBtn"
          style={{
            cursor: isDisabled || InputFieldDisabled ? "default" : "pointer",
          }}
        />
      </div>
      {showAttachment && <SelectedFileView />}
    </div>
  );
};

export default MessageInput;
