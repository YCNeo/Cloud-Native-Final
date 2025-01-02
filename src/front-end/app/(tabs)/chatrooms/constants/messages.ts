import { MessageProps } from "../model";

const sampleMessages: MessageProps[] = [
  {
    id: 1,
    timestamp: new Date("2021-10-01 20:00:00").toISOString(),
    senderId: 1,
    text: "Hello from user 1",
  },
  {
    id: 2,
    timestamp: new Date("2021-10-01 20:00:00").toISOString(),
    senderId: 2,
    text: "Hello from user 2",
  },
];

export default sampleMessages;
