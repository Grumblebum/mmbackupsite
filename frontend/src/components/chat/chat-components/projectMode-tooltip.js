import React, { useEffect, useRef } from "react";
import Image from "next/image";

import useCheckIsMobileView from "@/hooks/useCheckIsMobileView";
import { useChatSystemContext } from "@/hooks/use-chat-system-context";

import projectmodeTooltip from "@/assets/icons/chat/chat_mobile_icon/projectmodeTooltip2.svg";
import crossIcon from "@/assets/icons/chat/chat_mobile_icon/cross.svg";

const ProjectModeTooltip = ({ isAttachment }) => {
  const tooltipRef = useRef(null);

  const { isMobileView } = useCheckIsMobileView();
  const { showProjectModeTooltip, updateState } = useChatSystemContext();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
        updateState("showProjectModeTooltip", false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [updateState]);

  useEffect(() => {
    if (!isMobileView) updateState("showProjectModeTooltip", false);
  }, [isMobileView]);

  const onClickReadMore = () => {
    window.open("/faqs#project_mode", "_blank");
  };

  return (
    <div
      ref={tooltipRef}
      className={`projectModetooltip
    ${showProjectModeTooltip && "projectModetooltip-open"}
    ${isAttachment && "projectModetooltip-attachment"}
    `}
    >
      <div className="header-projectmode">
        <p className="chat-text">Project Mode Active</p>

        <Image
          src={crossIcon}
          id="projectMode-cross"
          onClick={() => updateState("showProjectModeTooltip", false)}
          alt="crossIcon"
        />
      </div>

      <div>
        <Image
          src={projectmodeTooltip}
          draggable={false}
          alt="projectmodeTooltip"
        />
        <p onClick={onClickReadMore} className="chat-text readmore">
          Read More
        </p>
      </div>
    </div>
  );
};

export default ProjectModeTooltip;
