"use client";

import React, { useState } from "react";
import { Spin } from "antd";

import { useChatSystemContext } from "@/hooks/use-chat-system-context";

import CustomTurnstile from "@/components/custom-turnstile";

import { LoadingOutlined } from "@ant-design/icons";

const CloudflareFooter = ({
  setIsCfVerified,
  url,
  setUrl,
  setSecureCode,
  IsCfVerified,
  router,
}) => {
  const [isLoadingGenerateLink, setIsLoadingGenerateLink] = useState(false);

  const { sessionData, updateState } = useChatSystemContext();

  const handleOnGenerateLink = () => {
    if (!url) {
      setIsLoadingGenerateLink(true);
      setTimeout(() => {
        setUrl("https://messagemoment.com/chat/sqjgcf9o2s5na");
        setSecureCode("4562");

        updateState("sessionData", {
          ...sessionData,
          sessionURL: "https://messagemoment.com/chat/sqjgcf9o2s5na",
          sessionId: "sqjgcf9o2s5na",
          sessionSeurityCode: "4562",
        });

        setIsLoadingGenerateLink(false);
      }, 1000);
    } else {
      router.push(`/chat/${sessionData?.sessionId}`);
    }
  };

  return (
    <>
      <div className="gen-btn">
        <CustomTurnstile
          setIsCfVerified={setIsCfVerified}
          key={"cloudflare-custom-turnstile"}
        />
        <button
          disabled={IsCfVerified ? false : true}
          onClick={handleOnGenerateLink}
          className={`text-blue ${!IsCfVerified && "inactive"}`}
        >
          {isLoadingGenerateLink ? (
            <Spin indicator={<LoadingOutlined spin />} size="default" />
          ) : url ? (
            "Open Chat"
          ) : (
            "Generate Link"
          )}
        </button>
      </div>
      <p className="note text-white text-center">
        By starting this chat session, you agree to our{" "}
        <span className="underline-link">
          <a href="/terms" target="_blank">
            Terms of Use
          </a>
        </span>{" "}
        and{" "}
        <span className="underline-link">
          <a href="/privacy" target="_blank">
            Privacy Policy
          </a>
        </span>
        , and that you and everybody you share the chat link with is above 16
        years of age.
      </p>
    </>
  );
};

export default CloudflareFooter;
