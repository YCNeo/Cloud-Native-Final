import express from "express";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Server as SocketIOServer } from "socket.io";
import cors from "cors";
import {
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData,
  RoomMessageModel,
} from "./model";
import {
  chatMessageService,
  joinRoomService,
  partialMessageService,
} from "./service";

const app = express();
const PORT = 8080;

// Define the client URL
const clientIP = "3.27.230.165";
const clientURL = `https://${clientIP}:8081`;
const corsOptions = {
  origin: clientURL,
  methods: ["GET", "POST"],
  credentials: true,
};

const server = http.createServer(app);
const io = new SocketIOServer<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(server, {
  cors: corsOptions,
});

// Serve static files from the 'public' directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors(corsOptions));

app.use(express.static(path.join(__dirname, "../public")));

server.listen(PORT, () => {
  console.log(`Socket server is running on port ${PORT}`);
});

io.on("connection", (socket) => {
  console.log(`A user connected: ${socket.id}`);

  // Handle 'joinRoom' event
  socket.on("joinRoom", async (data) => {
    const elements = await joinRoomService(data);
    const systemWelcomeMessage = {
      senderId: "system",
      message: `Welcome ${data.userName} join ${data.roomName}`,
      timestamp: new Date().toISOString(),
    };
    socket.join(data.roomId);
    socket.emit("partialMessage", elements);
    io.to(data.roomId).emit("currentMessage", systemWelcomeMessage);
  });

  // Handle 'chatMessage' event
  socket.on("chatMessage", (data) => {
    const messageDetail: RoomMessageModel = {
      senderId: data.userId,
      message: data.message,
      timestamp: new Date().toISOString(),
    };
    io.to(data.roomId).emit("currentMessage", messageDetail);

    // Add the message to the room list in Redis
    chatMessageService({ ...messageDetail, roomId: data.roomId });
  });

  // Handle 'getPartialMessage' event
  socket.on("getPartialMessage", async (data) => {
    let result: RoomMessageModel[] = [];
    try {
      result = await partialMessageService(data);
    } catch (err) {
      console.error("Error getting partial message:", err);
    }

    socket.emit("partialMessage", result);
  });

  // Handle 'disconnect' event
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

export default io;
