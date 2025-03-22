import React from "react";
import Image from "next/image";

import { getUploadIconType } from "@/dummy-data";

import { useChatSystemContext } from "@/hooks/use-chat-system-context";

import grey_cross from "@/assets/icons/chat/grey_icon.svg";

const SelectedFileView = () => {
  const { filedata, updateState } = useChatSystemContext();

  return (
    <div className="selectedfileContainer">
      <Image
        src={getUploadIconType(filedata?.type)}
        alt="selected-upload-file"
      />

      <p className="chat-small-text">
        {filedata?.name && filedata?.name.length > 15
          ? `${filedata.name.slice(0, 15)}...`
          : filedata?.name}
      </p>

      <Image
        src={grey_cross}
        id="grey_cross"
        onClick={() => updateState("showAttachment", false)}
      />
    </div>
  );
};

export default SelectedFileView;
