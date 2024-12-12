import Redis from "ioredis";

const redisClient = new Redis("redis");

export default redisClient;
