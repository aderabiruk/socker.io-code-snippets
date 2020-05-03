import cors from 'cors';
import http from 'http';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from "body-parser";
import compression from 'compression';
import socket, { Socket } from 'socket.io';
import express, { Application } from 'express';

import initializeDb from './utils/initializeDb';
import ClientService from './services/Client.service';

/**
 * Initialize Express App
 */
const app: Application = express();
const server = http.createServer(app);

/**
 * Middlewares
 */
app.use(compression());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(helmet());
app.use(cors());
app.use(morgan("combined"));

/**
 * Initialize Socket.io
 */
const io = socket(server);

io.on("connection", (socket: Socket) => {
    const service = new ClientService(io, socket);
    service.start();
});

/**
 * Initialize Database
 */
initializeDb();

export default server;