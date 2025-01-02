export default interface ChatroomProps {
  id: number;
  room_id: number;
  name: string;
}

export interface MessageProps {
  id: number;
  timestamp: string;
  senderId: number;
  text: string;
}

export interface Transaction {
  id: number;
  datetime: string;
  title: string;
  super_cid: string;
  payer: number;
  attendees_ids: number[];
  price: number;
  issplited: boolean;
}

export interface SplitTransaction {
  from: number;
  to: number;
  amount: number;
}
