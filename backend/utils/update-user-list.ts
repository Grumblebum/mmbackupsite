import { Server } from "socket.io";

import SessionModel from "../models/session-model.js";

export const UpdateUserList = async (io: Server, sessionId: string) => {
  try {
    const session = await SessionModel.findOne({ sessionId });

    if (!session) return;

    const users = session.participants.map((p) => p.username);

    io.to(sessionId).emit("updateUserList", { users });
  } catch (error) {
    console.error("Error updating user list:", error);
  }
};
