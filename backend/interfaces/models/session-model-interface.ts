import { Document } from "mongoose";

import { SessionTypeEnum } from "../../enums/session-type-enum.js";

export interface ISession extends Document {
  sessionId: string;
  sessionType: SessionTypeEnum;
  sessionSecurityCode?: string;
  sessionIp: string;
  sessionLocation: {
    longitude: number;
    latitude: number;
    city: string;
    country: string;
  };
  participantCount: number;
  sessionTimer: number;
  isExpirationTimeSet: boolean;
  isProjectModeOn: boolean;
  sessionLocked: boolean;
  participants: Array<{
    userId: string;
    username: string;
    assignedColor: number;
    joinedAt: Date;
  }>;
  sessionExpired: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
