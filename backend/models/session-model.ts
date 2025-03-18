import mongoose, { Schema } from "mongoose";
import { ISession } from "../interfaces/models/session-model-interface.js";
import { SessionTypeEnum } from "../enums/session-type-enum.js";

const SessionSchema: Schema<ISession> = new Schema(
  {
    sessionId: { type: String, required: true, unique: true },
    sessionType: {
      type: String,
      enum: Object.values(SessionTypeEnum),
      required: true,
    },
    sessionSecurityCode: { type: String, default: null },
    sessionIp: { type: String, required: true },
    sessionLocation: {
      longitude: { type: Number },
      latitude: { type: Number },
      city: { type: String },
      country: { type: String },
    },
    participantCount: { type: Number, default: 0, min: 0, max: 10 },
    sessionTimer: { type: Number, default: 30, min: 3, max: 300 },
    isExpirationTimeSet: { type: Boolean, default: false },
    isProjectModeOn: { type: Boolean, default: false },
    sessionLocked: { type: Boolean, default: false },
    sessionExpired: { type: Boolean, default: false },
    participants: [
      {
        userId: {
          type: String,
          ref: "Participant",
          required: true,
        },
        username: { type: String },
        assignedColor: { type: Number },
        joinedAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true }
);

SessionSchema.index({ "sessionLocation.coordinates": "2dsphere" });
const SessionModel = mongoose.model<ISession>("Session", SessionSchema);
export default SessionModel;
