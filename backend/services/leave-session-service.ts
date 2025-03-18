import SessionModel from "models/session-model.js";
import ParticipantModel from "models/participant-model.js";

import { FormatDuration } from "utils/format-duration.js";

export const LeaveSessionService = async (
  sessionId: string,
  username: string
) => {
  try {
    if (!sessionId || !username) {
      throw new Error("Session ID and Username are required.");
    }

    const normalizedUsername = username.toLowerCase();
    console.info(`User ${normalizedUsername} leaving session: ${sessionId}`);

    const participant = await ParticipantModel.findOne({
      sessionId,
      username: normalizedUsername,
    });
    if (!participant || !participant.createdAt) {
      throw new Error(
        "Participant not found in session or missing creation timestamp."
      );
    }

    // Calculate session duration
    const leaveTime = new Date();
    const sessionDurationSeconds = Math.floor(
      (leaveTime.getTime() - participant.createdAt.getTime()) / 1000
    );
    const formattedSessionDuration = FormatDuration(sessionDurationSeconds);

    await ParticipantModel.findOneAndUpdate(
      { sessionId, username: normalizedUsername },
      { isActive: false, sessionDuration: sessionDurationSeconds },
      { new: true }
    );

    const session = await SessionModel.findOneAndUpdate(
      { sessionId },
      {
        $pull: { participants: { username: normalizedUsername } },
        $inc: { participantCount: -1 },
      },
      { new: true }
    );

    if (session && session.participantCount <= 0) {
      session.sessionExpired = true;
      await session.save();
    }

    return { formattedSessionDuration, session, username: normalizedUsername };
  } catch (error: any) {
    console.error("Error in LeaveSessionService:", error);
    throw new Error(error.message);
  }
};
