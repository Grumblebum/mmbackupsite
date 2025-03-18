import { Server, Socket } from "socket.io";

import { JoinRoomPayload } from "interfaces/events/join-room-event-interface.js";

import { RedisDatabase } from "../databases/redis-database.js";

import { ValidateUsername } from "validations/validate-username.js";
import { ValidateSessionSecurityCode } from "validations/validate-session-security-code.js";

import { CreateSessionService } from "services/create-session-service.js";
import { CreateParticipantService } from "services/create-participant-service.js";
import { UpdateSessionParticipantsService } from "services/update-session-participants-service.js";
import { DeleteSessionLinkService } from "services/delete-session-link-service.js";
import { FetchSessionService } from "services/fetch-session-service.js";

import { SessionFullNotification } from "notifications/session-full-notification.js";
import { UserJoinedNotification } from "notifications/user-joined-notification.js";

import { UpdateUserList } from "utils/update-user-list.js";

const JoinRoom = (io: Server, socket: Socket): void => {
  socket.on("joinRoom", async (data: JoinRoomPayload) => {
    try {
      const { sessionId, sessionSecurityCode, username } = data;
      console.info(`User attempting to join session: ${sessionId}`);
      if (!sessionId || !username) {
        socket.emit("error", "Session ID and Username are required.");
        return;
      }

      if (!RedisDatabase) {
        console.error("RedisDatabase is not initialized.");
        return;
      }
      const sessionData = await RedisDatabase.get(sessionId);
      let session = await FetchSessionService(sessionId);

      if (sessionData && !session) {
        console.log(`Creating new session in MongoDB from Redis data`);

        const parsedSession = JSON.parse(sessionData);

        session = await CreateSessionService(parsedSession);
        await DeleteSessionLinkService(sessionId);
      }

      // INVALID SESSION LOGIC
      if (!session) {
        socket.emit("redirect", "/expired-session");
        return;
      }

      // SESSION EXPIRED LOGIC
      if (session.sessionExpired) {
        socket.emit("redirect", "/expired-session");
        return;
      }

      // SESSION LOCKED LOGIC
      if (session.sessionLocked) {
        socket.emit("redirect", "/session-locked");
        return;
      }

      // VALIDATE USERNAME
      if (!ValidateUsername(session, username, socket)) return;

      // VALIDATE SECURITY CODE
      if (!ValidateSessionSecurityCode(session, sessionSecurityCode, socket))
        return;

      // SESSION FULL LOGIC
      if (session.participantCount >= 10) {
        socket.emit("redirect", "/full-session");
        return;
      }

      const participant = await CreateParticipantService(
        session,
        username,
        socket
      );
      await UpdateSessionParticipantsService(session, participant);

      // JOIN USER TO SOCKET ROOM
      socket.join(sessionId);
      console.info(`Socket ${socket.id} joined room ${sessionId}`);

      await UserJoinedNotification(
        io,
        sessionId,
        username,
        participant.assignedColor
      );

      socket.emit("setActiveUser", { username });

      await UpdateUserList(io, sessionId);
      await SessionFullNotification(io, sessionId);

      // SEND DATA TO FRONT-END
      socket.emit("joinedRoom", {
        sessionId,
        userId: participant.userId,
        assignedColor: participant.assignedColor,
        message: "Successfully joined room",
      });
    } catch (error) {
      console.error("Error joining room:", error);
      socket.emit("error", "Server error while joining room.");
    }
  });
};

export { JoinRoom };
