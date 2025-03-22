import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

import useCheckIsMobileView from "@/hooks/useCheckIsMobileView";
import { useChatSystemContext } from "@/hooks/use-chat-system-context";

import Session from "@/components/session/session";
import Button from "@/components/button";

import conversation from "@/assets/icons/chat/conversation.svg";
import Blur from "@/assets/images/blur.png";

const ChatLeaveModal = () => {
  const [isClosing, setisClosing] = useState(false);

  const router = useRouter();
  const { isMobileView } = useCheckIsMobileView();
  const { showChatLeaveModal, updateState } = useChatSystemContext();

  return (
    <div className={`chatLeaveModal ${showChatLeaveModal && "open-fade"}`}>
      <div className={`chatSession-container ${isClosing && "fade-out"}`}>
        {isMobileView ? (
          <>
            <Image src={Blur} className="blur-img" alt="Blur" />
            <div className="chat-leave-mobile-container">
              <Image src={conversation} alt="conversation-img" />
              <h4>
                Are you sure that you want to leave this chat conversation?
              </h4>
              <p className="chat-text desc">
                Once all users have disconnected from this chat session, it will
                no longer be accessible by anyone using this link.
              </p>
              <div className="btn-flex">
                <Button
                  text={"Cancel"}
                  height={"46px"}
                  width={"150px"}
                  className={"cancel-btn"}
                  onClick={() => {
                    setisClosing(true);
                    setTimeout(() => {
                      updateState("showChatLeaveModal", false);
                      setisClosing(false);
                    }, 300);
                  }}
                />
                <Button
                  text={"Leave"}
                  height={"46px"}
                  width={"150px"}
                  className="btn-primary text-white header-btn btn-leave"
                  onClick={() => {
                    setisClosing(true);
                    updateState("isWalletConnected", false);
                    setTimeout(() => {
                      updateState("showChatLeaveModal", false);
                    }, 300);
                    setTimeout(() => {
                      router.push("/");
                    }, 350);
                  }}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <Session
              key={`expired-session`}
              imgName={conversation}
              height={400}
              showFooter={false}
            >
              <h4>
                Are you sure that you want to leave this chat conversation?
              </h4>
              <p className="chat-text desc">
                Once all users have disconnected from this chat session, it will
                no longer be accessible by anyone using this link.
              </p>
              <div className="btn-flex">
                <Button
                  text={"Cancel"}
                  height={"46px"}
                  width={"150px"}
                  className={"cancel-btn"}
                  onClick={() => {
                    setisClosing(true);
                    setTimeout(() => {
                      updateState("showChatLeaveModal", false);
                      setisClosing(false);
                    }, 300);
                  }}
                />
                <Button
                  text={"Leave"}
                  height={"46px"}
                  width={"150px"}
                  className="btn-primary text-white header-btn btn-leave"
                  onClick={() => {
                    setisClosing(true);
                    updateState("isWalletConnected", false);
                    setTimeout(() => {
                      updateState("showChatLeaveModal", false);
                    }, 300);
                    setTimeout(() => {
                      router.push("/");
                    }, 350);
                  }}
                />
              </div>
            </Session>
          </>
        )}
      </div>
    </div>
  );
};

export default ChatLeaveModal;
