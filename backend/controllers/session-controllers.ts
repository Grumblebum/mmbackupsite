import { NextFunction, Request, Response } from "express";

import { RedisDatabase } from "databases/redis-database.js";

import { SessionTypeEnum } from "../enums/session-type-enum.js";

import { StoreSessionLinkService } from "../services/store-session-link-service.js";
import { FetchSessionService } from "services/fetch-session-service.js";

import { CatchAsyncErrors } from "../utils/catch-async-errors.js";
import { ErrorHandler } from "../utils/error-handler.js";
import { SessionIdGenerator } from "../utils/session-id-generator.js";
import { SecurityCodeGenerator } from "../utils/security-code-generator.js";

// GENERATE SESSION LINK FUNCTION
export const GenerateSessionLinkFunction = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sessionType } = req.body;
      if (!Object.values(SessionTypeEnum).includes(sessionType)) {
        return next(new ErrorHandler("Invalid session type", 400));
      }

      const sessionId = SessionIdGenerator();

      const sessionSecurityCode =
        sessionType === SessionTypeEnum.SECURE
          ? SecurityCodeGenerator()
          : undefined;

      const sessionIp =
        req.headers["x-forwarded-for"]?.toString().split(",")[0].trim() ||
        req.socket.remoteAddress ||
        "Unknown";

      const sessionData = {
        sessionId,
        sessionType,
        sessionSecurityCode,
        sessionIp,
      };

      await StoreSessionLinkService(sessionId, sessionData);
      return res.status(201).json({
        success: true,
        message: "Session link generated successfully",
        data: {
          sessionId,
          sessionType,
          sessionSecurityCode,
          sessionIp,
        },
      });
    } catch (error: any) {
      const message = error.response?.data?.error || error.message;
      return next(new ErrorHandler(message, error.response?.status || 500));
    }
  }
);

// VALIDATE SEESION FUNTION
export const ValidationSessionFunction = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sessionId } = req.params;
      if (!sessionId) {
        return res.status(400).json({
          success: false,
          redirect: "/invalid-session",
          message: "Session ID is required",
        });
      }

      if (!RedisDatabase) {
        console.error("RedisDatabase is not initialized.");
        return res.status(500).json({
          success: false,
          redirect: "/error",
          message: "Internal server error",
        });
      }

      const sessionData = await RedisDatabase.get(sessionId);
      const session = await FetchSessionService(sessionId);

      // Case 1: Session exists in Redis → Allow access
      if (sessionData) {
        return res.status(200).json({ success: true, redirect: null });
      }

      // Case 2: Session exists in MongoDB and is not expired
      if (session && !session.sessionExpired) {
        // Condition 1: If session is locked, redirect to "/locked-session"
        if (session.sessionLocked) {
          return res.status(200).json({
            success: false,
            redirect: "/locked-session",
            message: "Session is locked",
          });
        }

        // Condition 2: If session is full (participantCount >= 10), redirect to "/full-session"
        if (session.participantCount >= 10) {
          return res.status(200).json({
            success: false,
            redirect: "/full-session",
            message: "Session is full",
          });
        }

        // Otherwise, allow access
        return res.status(200).json({ success: true, redirect: null });
      }

      // Case 3 & 4: Session is missing or expired → Redirect to "/expired-session"
      return res.status(200).json({
        success: false,
        redirect: "/expired-session",
        message: "Session is expired or does not exist",
      });
    } catch (error: any) {
      const message = error.response?.data?.error || error.message;
      return next(new ErrorHandler(message, error.response?.status || 500));
    }
  }
);

// FETCH INTIAL CHAT LOAD DATA FUNCTION
export const FetchInitialChatLoadDataFunction = CatchAsyncErrors(
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { sessionId } = req.params;
      if (!sessionId) {
        return next(new ErrorHandler("Session ID is required", 400));
      }

      let data = null;

      if (!RedisDatabase) {
        return next(new ErrorHandler("RedisDatabase is not initialized.", 500));
      }
      const redisSessionData = await RedisDatabase.get(sessionId);
      if (redisSessionData) {
        data = JSON.parse(redisSessionData);
      } else {
        const session = await FetchSessionService(sessionId);
        if (session) {
          data = {
            sessionType: session.sessionType,
            sessionSecurityCode: session.sessionSecurityCode || null,
          };
        }
      }

      if (!data) {
        return res.status(200).json({
          success: false,
          message: "Session not found.",
        });
      }

      return res.status(200).json({
        success: true,
        data,
        message: "Session  details fetched successfully.",
      });
    } catch (error: any) {
      const message = error.response?.data?.error || error.message;
      return next(new ErrorHandler(message, error.response?.status || 500));
    }
  }
);
