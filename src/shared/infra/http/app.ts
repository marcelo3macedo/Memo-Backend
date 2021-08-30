import 'reflect-metadata';
import 'express-async-errors';
import express from "express";

import { router } from './routes';

const app = express();

app.use(express.json());

app.use(router);

export { app };