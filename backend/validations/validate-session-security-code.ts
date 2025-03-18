import { Socket } from "socket.io";

import { ISession } from "../interfaces/models/session-model-interface.js";
import { SessionTypeEnum } from "enums/session-type-enum.js";

export const ValidateSessionSecurityCode = (
  session: ISession,
  sessionSecurityCode: string | undefined,
  socket: Socket
): boolean => {
  if (!sessionSecurityCode) {
    socket.emit("error", "Invalid security code.");
    return false;
  }

  if (
    session.sessionType === SessionTypeEnum.SECURE &&
    session.sessionSecurityCode !== sessionSecurityCode
  ) {
    socket.emit("error", "Invalid security code.");
    return false;
  }

  return true;
};
