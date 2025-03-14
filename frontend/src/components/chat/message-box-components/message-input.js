import Image from "next/image";
import React from "react";
import arrow from "@/assets/icons/chat/open_right.svg";
import SelectedFileView from "../chat-components/selected-file";
import CommandModal from "./commandModal";

/**
 * MessageInput renders a chat input field with send button and command modal.
 * The input field is controlled by the `input` and `handleInputChange` props.
 * The send button is controlled by the `handleClickSendBtn` prop.
 * The command modal is controlled by the `showCommands`, `selectedCommands`, `commandlist`, `handleSelectedCommand`, and `handleSelectedUser` props.
 * The component also renders a selected file view if `showAttachment` is true.
 * The component also renders a command modal if `showCommands` is true.
 * The component also renders a timer icon if `isTimerCommand` is true.
 * The component also renders an attachment icon if `showAttachment` is true.
 * The `InputFieldDisabled` prop is used to disable the input field.
 * The `KeyboardType` prop is used to set the keyboard type of the input field.
 * The `commandModalRef` prop is used to set the reference of the command modal.
 * The `handleKeyDown` prop is used to set the on key down event of the input field.
 * The `renderCommandsModal` prop is used to render the command modal.
 * The `userlist` prop is used to set the list of users to be displayed in the command modal.
 * The `selectedIndex` prop is used to set the index of the currently selected item in the command modal.
 * The `setSelectedColor` prop is used to set the color of the selected user.
 * The `setShowCommands` prop is used to set the visibility of the command modal.
 * The `isRemoveCommand` prop is used to set the visibility of the remove command button in the command modal.
 */
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
  setShowCommands
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
