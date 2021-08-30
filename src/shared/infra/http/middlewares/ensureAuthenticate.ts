import auth from "@config/auth";
import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { AppError } from "@shared/errors/AppError";

interface IPayload {
   sub: string;
}

export async function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
    const authHeader = request.headers.authorization;

   if (!authHeader) {
      throw new AppError("Token missing", 401);
   }

   const [, token] = authHeader.split(" ");

   try {
      const { sub: userId } = verify(token, auth.secret) as IPayload;
      
      request.user = { id: userId };

      next();
   } catch (error) {
      throw new AppError("Invalid token", 401);
   }
}