import { Socket } from "socket.io";

import { ISession } from "../interfaces/models/session-model-interface.js";

export const ValidateUsername = (
  session: ISession,
  username: string,
  socket: Socket
): boolean => {
  const existingUser = session.participants.find(
    (participant) => participant.username === username
  );
  if (existingUser) {
    console.log(`Duplicate username attempt: ${username}`);
    socket.emit(
      "usernameError",
      "The Display Name you entered is already in use. Please choose something else."
    );
    return false;
  }
  return true;
};
