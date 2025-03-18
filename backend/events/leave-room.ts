import { Server, Socket } from "socket.io";

import { LeaveSessionService } from "services/leave-session-service.js";
import { FetchSessionService } from "services/fetch-session-service.js";

import { UserLeftNotification } from "notifications/user-left-notification.js";

import { UpdateUserList } from "utils/update-user-list.js";

const LeaveRoom = (io: Server, socket: Socket): void => {
  socket.on("leaveRoom", async (data) => {
    try {
      const { sessionId, username } = data;
      if (!sessionId || !username) {
        socket.emit("error", "Session ID and Username are required.");
        return;
      }

      const session = await FetchSessionService(sessionId);
      if (!session) {
        console.warn(`Session not found for sessionId: ${sessionId}`);
        return;
      }

      const participant = session.participants.find(
        (p) => p.username.toLowerCase() === username.toLowerCase()
      );
      const assignedColor = participant ? participant.assignedColor : 0;

      await LeaveSessionService(sessionId, username);

      await UserLeftNotification(io, sessionId, username, assignedColor);

      await UpdateUserList(io, sessionId);

      socket.leave(sessionId);
    } catch (error: any) {
      console.error("Error leaving room:", error);
      socket.emit("error", error.message || "Server error while leaving room.");
    }
  });
};

export { LeaveRoom };
