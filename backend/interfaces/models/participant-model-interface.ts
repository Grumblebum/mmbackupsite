import { Document } from "mongoose";

export interface IParticipant extends Document {
  sessionId: string;
  userId: string;
  username: string;
  participantIp: string;
  telcomProvider: string;
  participantLocation: {
    longitude: number;
    latitude: number;
    city: string;
    country: string;
  };
  device: string;
  browser: string;
  sessionDuration: number;
  sessionCount: number;
  assignedColor: number;
  hasLockedSession: boolean;
  isActive: boolean;
  createdAt: Date;
  updatedAt?: Date;
}
