import { SessionTypeEnum } from "@/enums/session-type-enum";

export const ShareURL = (type, sessionData, url) => {
  const shareText = encodeURIComponent(
    `Join me for a chat on MessageMoment – ${url}${
      sessionData.sessionType == SessionTypeEnum.SECURE
        ? `\n\nSecurity Code: ${sessionData?.sessionSeurityCode}`
        : ""
    }`
  );

  const shareTextMail = encodeURIComponent(
    `Join me here – ${url}/${
      sessionData.sessionType == SessionTypeEnum.SECURE
        ? `\n\nSecurity Code: ${sessionData?.sessionSeurityCode}`
        : ""
    }`
  );

  const shareTelegramURL = encodeURIComponent(`${url}`.trim());
  const shareTelegramText = encodeURIComponent(
    `Join me for a chat on MessageMoment.${
      sessionData.sessionType == SessionTypeEnum.SECURE
        ? `\n\nSecurity Code: ${sessionData?.sessionSeurityCode}`
        : ""
    }`
  );

  if (type == "whatsapp") {
    window.open(`https://wa.me/?text=${shareText}`, "_blank");
  } else if (type == "telegram") {
    window.open(
      `https://t.me/share/url?url=${shareTelegramURL}&text=${shareTelegramText}`,
      "_blank"
    );
  } else if (type == "message") {
    window.open(`sms:?&body=${shareText}`, "_blank");
  } else if (type == "messenger") {
    window.open(
      `https://www.facebook.com/dialog/send?app_id=YOUR_FACEBOOK_APP_ID&link=https://message-moment-app.vercel.app/&redirect_uri=https://message-moment-app.vercel.app/`,
      "_blank"
    );
  } else if (type == "mail") {
    window.open(
      `mailto:?subject=Join me for a chat on MessageMoment&body=${shareTextMail}`,
      "_blank"
    );
  } else if (type == "instagram") {
    window.open(`https://www.instagram.com/`, "_blank");
  }
  return null;
};
