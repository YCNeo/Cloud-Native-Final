export type RoomMessage = {
  sender: string;
  message: string;
  timestamp: string;
};

export type UserRoomMappingModel = {
  room: string;
  userId: string;
  userName: string;
};

export interface ServerToClientEvents {
  currentMessage: (data: RoomMessage) => void;
  historyMessage: (data: RoomMessage[]) => void;
  partialMessage: (data: RoomMessage[]) => void;
}

export interface ClientToServerEvents {
  joinRoom: (data: UserRoomMappingModel) => void;
  chatMessage: (
    data: UserRoomMappingModel & {
      message: string;
    }
  ) => void;
  getPartialMessage: (data: UserRoomMappingModel & { lastLoad: number }) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  userID?: string;
}
