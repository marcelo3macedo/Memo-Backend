import auth from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";
import logger from "@config/logger";

interface IPayload {
   sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

   if (!authHeader) {
      logger.warn(`[ensureAuthenticate] Token Missing - IP ${request.socket.remoteAddress}`)
      throw new AppError("Token missing", 401);
   }

   const [, token] = authHeader.split(" ");

   try {
      const { sub: userId } = verify(token, auth.secret) as IPayload;
      
      request.user = { id: userId };

      next();
   } catch (error) {
      logger.warn(`[ensureAuthenticate] Invalid Token - IP ${request.socket.remoteAddress}`)
      throw new AppError("Invalid token", 401);
   }
}