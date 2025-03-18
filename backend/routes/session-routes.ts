import express from "express";

import {
  FetchInitialChatLoadDataFunction,
  GenerateSessionLinkFunction,
  ValidationSessionFunction,
} from "../controllers/session-controllers.js";

const SessionRouter = express.Router();

// API PATHS
SessionRouter.post("/generate-session-link", GenerateSessionLinkFunction);
SessionRouter.get("/validate-session/:sessionId", ValidationSessionFunction);
SessionRouter.get(
  "/fetch-initial-chat-load-data/:sessionId",
  FetchInitialChatLoadDataFunction
);

export default SessionRouter;
