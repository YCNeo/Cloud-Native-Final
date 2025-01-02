import Redis from "ioredis";

const REDIS_URL = 6379; // for deploy
// const REDIS_URL = "redis"; // for local
const redisClient = new Redis(REDIS_URL);

export default redisClient;
