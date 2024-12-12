import Redis from "ioredis";
import { RoomMessage, UserRoomMappingModel } from "./model";

const redisClient = new Redis("redis");

export async function joinRoomService(
  data: UserRoomMappingModel
): Promise<RoomMessage[]> {
  console.log(data);
  const { room, userId, userName } = data;
  let result: RoomMessage[] = [];

  try {
    // Check if the room exists in Redis
    const exists = await redisClient.exists(`room:${room}`);
    if (exists) {
      console.log(`A user: ${userName} joined room: ${room}`);

      // Get all elements in the room list (last 100 messages)
      const roomMessageAmount = await redisClient.llen(`room:${room}`);
      const start = Math.max(0, roomMessageAmount - 100);
      const elements = await redisClient.lrange(`room:${room}`, start, -1);
      result = elements.map((element) => JSON.parse(element));

      console.log("Retrieved messages:", result);
    } else {
      console.log(`Room ${room} does not exist. Creating it.`);

      // Create the room and add a welcome message
      await redisClient.rpush(
        `room:${room}`,
        JSON.stringify({
          sender: "system",
          message: `Room ${room} created.`,
          timestamp: new Date().toISOString(),
        })
      );

      // Retrieve the initial message
      const elements = await redisClient.lrange(`room:${room}`, 0, -1);
      result = elements.map((element) => JSON.parse(element));
    }

    // Record user in room
    await redisClient.hset(`room:${room}:members`, userId, userName);
  } catch (err) {
    console.error("Error in joinRoomService:", err);
  }

  return result;
}

export function chatMessageService(data: RoomMessage, room: string) {
  // "room:${room}":"[{"sender":"Alice","message":"Hello","timestamp":"2021-12-01T00:00:00.000Z"}]"
  redisClient.rpush(
    `room:${room}`,
    JSON.stringify({
      sender: data.sender,
      message: data.message,
      timestamp: data.timestamp,
    }),
    (err) => {
      if (err) {
        console.error("Error adding message to room list in Redis:", err);
      }
    }
  );
}

export async function partialMessageService(
  data: UserRoomMappingModel & { lastLoad: number }
): Promise<RoomMessage[]> {
  const { room, userId, userName, lastLoad } = data;
  let result: RoomMessage[] = [];

  // get last time load and amount of message in room
  // and decide how many to load
  try {
    const userLoad = Number(
      await redisClient.hget(`room:${room}:members:${userName}`, "load")
    );
    const roomMessageAmount = await redisClient.llen(`room:${room}`);
    const toLoad =
      roomMessageAmount >= userLoad + 100 ? userLoad + 100 : roomMessageAmount;

    // Get specific amount message in the room list and send back to frontend
    const messages = await redisClient.lrange(`room:${room}`, 0, toLoad);
    result = messages.map((element) => JSON.parse(element));
    // update load
    await redisClient.hset(`room:${room}:members:${userName}`, {
      load: toLoad,
    });
  } catch (err) {
    console.error("Error in partialMessageService:", err);
  }

  return result;
}
