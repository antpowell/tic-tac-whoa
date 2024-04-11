import express from "express";
import http from "http";
const app = express();
const server = http.createServer(app);

import { Server } from "socket.io";
const io = new Server(server, {
  cors: {
    origin: "127.0.0.1:3000",
  },
});

interface PlayerMove {
  player: string;
  index: number;
}

io.on("connection", (socket) => {
  console.log("Connection to server established");

  socket.on("gameSearch", ({ playerId }) => {
    const msg = `player ${playerId} is searching for a game`;
    console.log(msg);

    io.emit("message", msg);
  });

  socket.on("gameFound", ({ playerId, gameId }) => {
    const msg = `player ${playerId} found a game ${gameId}`;
    console.log(msg);
    io.emit("message", msg);
  });

  socket.on("playerMove", ({ player, index }: PlayerMove) => {
    const msg = `${player} played ${index}`;
    io.emit("message", msg);
  });

  socket;
  socket.on("disconnect", () => {
    console.log("Connection to server closed");
  });
});
