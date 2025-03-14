import React from "react";
import regeneratedNotification from "@/assets/icons/regeneratedNotification.svg";
import copiedNotification from "@/assets/icons/copiedNotification.svg";
import Image from "next/image";

const NotificationTooltip = ({
  notificationtype,
  isVisible,
}) => {
  return (
    <>
      {isVisible && (
        <Image
          src={
            notificationtype == "reg"
              ? regeneratedNotification
              : copiedNotification
          }
          alt="copied notification"
          className={`notification-tooltip ${
            notificationtype === "reg" ? "reg" : "copy"
          } ${isVisible ? "fade-in" : "fade-out"}`}
        />
      )}
    </>
  );
};

export default NotificationTooltip;
