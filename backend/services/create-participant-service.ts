import * as UAParser from "ua-parser-js";

import ParticipantModel from "models/participant-model.js";

import { GetGeoLocation } from "utils/geo-location.js";
import { AssignParticipantColorNumber } from "utils/participant-color-number.js";
import { ParticipantIdGenerator } from "utils/participant-id-generator.js";

export const CreateParticipantService = async (
  session: any,
  username: string,
  socket: any
) => {
  const assignedNumber = await AssignParticipantColorNumber(session.sessionId);
  if (assignedNumber === -1)
    throw new Error("No available slots in this session.");

  const participantIp =
    socket.handshake.headers["x-forwarded-for"]
      ?.toString()
      .split(",")[0]
      .trim() ||
    socket.handshake.address ||
    "Unknown";

  const participantLocation = await GetGeoLocation(participantIp);
  const userAgent = socket.handshake.headers["user-agent"];
  const parser = new UAParser.UAParser(userAgent);
  const device = parser.getDevice().model || "Unknown Device";
  const browser = parser.getBrowser().name || "Unknown Browser";
  const generatedUserId = ParticipantIdGenerator();

  const participant = await ParticipantModel.create({
    sessionId: session.sessionId,
    userId: generatedUserId,
    username,
    participantIp,
    telcomProvider: participantLocation?.telcomProvider || "unknown",
    participantLocation: participantLocation || {},
    device,
    browser,
    assignedColor: assignedNumber,
    hasLockedSession: false,
    isActive: true,
  });

  return participant;
};
