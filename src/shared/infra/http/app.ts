
import 'reflect-metadata';
import 'express-async-errors';
import express, { Response, Request, NextFunction } from "express";

import '@shared/infra/typeorm';
import '@shared/container';
import { AppError } from "@shared/errors/AppError";

import { router } from './routes';
import { corsConfig } from './cors';
import CacheManager from '@lib/CacheManager';
import QueueManager from '@lib/QueueManager';

const app = express();

app.use(corsConfig);
app.use(express.json());

app.use(router);

QueueManager.start()
CacheManager.connect()

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
       return response.status(err.statusCode).json({
          message: err.message,
       });
    }

    return response.status(500).json({
       status: "error",
       message: `Internal server error: - ${err.message}`,
    });
});

export { app };