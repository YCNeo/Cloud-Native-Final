import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  Modal,
} from "react-native";
import { useLocalSearchParams, useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import { useState } from "react";
import io from "socket.io-client";
import NewTransactionInput, {
  InputTransactionProps,
} from "./newTransactionInput";
import ChatroomProps, {
  MessageProps,
  SplitTransaction,
  Transaction,
} from "./model";

import sampleMessages from "./constants/messages";
import sampleAccounting from "./constants/accounting";
import axios from "axios";
import { expressServer, socketServer } from "@/constants/backendURL";

const socket = io(socketServer);
const userId = 1; // Example user ID

const messages = sampleMessages;

const accounting = sampleAccounting;

export default function ChatroomDetails() {
  const { room_id } = useLocalSearchParams();
  const router = useRouter();
  const darkmode = true;
  const [message, setMessage] = useState("");
  const [chatroomMessages, setChatroomMessages] = useState(messages);

  console.log("room_id:", room_id);

  const chatroom: ChatroomProps = {
    id: 1,
    room_id: room_id ? parseInt(room_id.toString()) : 1,
    name: "Chatroom " + (room_id ? room_id.toString() : "1"),
  };

  const [chatroomUsers, setChatroomUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      // 拿到聊天室的使用者
      if (room_id) {
        try {
          console.log("Fetching data for room_id:", room_id);
          const response = await axios.post(
            `${expressServer}/chatroom/getChatroomUsersRedis`,
            { chatroomID: room_id }
          );
          console.log("Response data:", response.data);
          setChatroomUsers(response.data);
        } catch (err) {
          console.error("Error fetching data:", err);
          setError("Error fetching data!!!");
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [room_id]);

  // handle socket events
  useEffect(() => {
    // Need to check again
    socket.emit("joinRoom", {
      roomId: chatroom.room_id,
      roomName: chatroom.name,
      userId,
      userName: "User" + userId,
    });

    socket.on("currentMessage", (data) => {
      const newMessage: MessageProps = {
        id: chatroomMessages.length + 1,
        timestamp: data.timestamp,
        senderId: data.senderId,
        text: data.message,
      };
      setChatroomMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    socket.on("partialMessage", (messages) => {
      interface SocketMessage {
        timestamp: string;
        senderId: number;
        message: string;
      }

      const formattedMessages: MessageProps[] = (
        messages as SocketMessage[]
      ).map((msg: SocketMessage) => ({
        id: chatroomMessages.length + 1,
        timestamp: msg.timestamp,
        senderId: msg.senderId,
        text: msg.message,
      }));
      setChatroomMessages(formattedMessages);
    });

    return () => {
      socket.off("currentMessage");
      socket.off("partialMessage");
    };
  }, [chatroom.room_id]);

  if (!chatroom) {
    return <NotFoundChatroom />;
  }

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        userId,
        roomId: chatroom.room_id,
        message: message.trim(),
      };
      socket.emit("chatMessage", newMessage);
      setMessage("");
    }
  };

  const [transactions, setTransactions] = useState(accounting);
  const [splitTransactions, setSplitTransactions] = useState<
    SplitTransaction[]
  >([]);

  const formatSplitTransactions = (transactions: Transaction[]) => {
    const splitTransactions: SplitTransaction[] = [];
    transactions.forEach((transaction) => {
      transaction.attendees_ids.forEach((attendee) => {
        if (attendee !== transaction.payer) {
          splitTransactions.push({
            from: transaction.payer,
            to: attendee,
            amount: transaction.price / transaction.attendees_ids.length,
          });
        }
      });
    });
    return splitTransactions;
  };

  const handleSplitButton = () => {
    setSplitTransactions(
      formatSplitTransactions(
        transactions.filter((item) => item.issplited === false)
      )
    );
  };

  const addTransaction = (inputTransaction: InputTransactionProps) => {
    const newTransaction: Transaction = {
      id: transactions.length + 1,
      datetime: inputTransaction.datetime,
      title: inputTransaction.title,
      super_cid: "super_cid",
      payer: parseInt(inputTransaction.payer),
      attendees_ids: inputTransaction.attendees_ids.map((id) => parseInt(id)),
      price: inputTransaction.price,
      issplited: inputTransaction.issplited,
    };
    setTransactions([...transactions, newTransaction]);
    console.log(transactions);
  };
  const [showAccounting, setShowAccounting] = useState(false);

  const openModal = () => {
    setShowAccounting(true);
  };

  const closeModal = () => {
    setShowAccounting(false);
  };

  return (
    <View style={styles.container}>
      {/* Topbar */}
      <View style={styles.topbar}>
        {/* Chatroom title */}
        <Text style={styles.topbarTitle}>{chatroom.name}</Text>

        {/* Back button */}
        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/chatrooms")}
          style={{
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <View style={{ marginRight: 15 }}>
            <FontAwesome5 name="arrow-left" size={22} color="black" />
          </View>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>{"Back"}</Text>
        </TouchableOpacity>

        {/* Split Bill Button */}
        <TouchableOpacity
          onPress={() => setShowAccounting(!showAccounting)}
          style={{
            marginRight: 20,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            right: 0,
            position: "absolute",
          }}
        >
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>
            {"Split-bill"}
          </Text>
          <View style={{ marginLeft: 15 }}>
            <FontAwesome5 name="money-bill-alt" size={22} color="black" />
          </View>
        </TouchableOpacity>
      </View>

      {/* Chatroom messages */}
      <View
        style={[
          styles.chatBackground,
          { backgroundColor: darkmode ? "#4F4C4A" : "#F6F6F6" },
        ]}
      >
        <View style={{ borderRadius: 10, marginBottom: 10 }} />
        <FlatList
          data={chatroomMessages.sort((a, b) =>
            a.timestamp.localeCompare(b.timestamp)
          )}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View
              style={[
                styles.messageContainer,
                item.senderId === userId
                  ? styles.userMessage
                  : styles.otherMessage,
              ]}
            >
              <Text style={styles.messageText}>{item.text}</Text>
            </View>
          )}
        />
      </View>

      {/* Input field and send button */}
      <View
        style={[
          styles.inputContainer,
          { backgroundColor: darkmode ? "#4F4C4A" : "#F6F6F6" },
        ]}
      >
        <TextInput
          style={[
            styles.input,
            {
              backgroundColor: darkmode ? "#4F4C4A" : "#F6F6F6",
              color: darkmode ? "#fff" : "#000",
            },
          ]}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message"
          onKeyPress={(e) => {
            // if (e.nativeEvent.key === 'Enter' && !e.shiftKey) {
            if (e.nativeEvent.key === "Enter") {
              e.preventDefault();
              handleSendMessage();
            }
            // else if (e.nativeEvent.key === 'Enter' && e.shiftKey) {
            //   setMessage((prevMessage) => prevMessage + '\n');
            // }
          }}
        />

        {/* Bill button */}
        {/* <TouchableOpacity ref={billButtonRef} onLayout={handleLayout} style={styles.billButton} onPress={() => setShowAccounting(!showAccounting)}> */}
        <TouchableOpacity
          style={styles.billButton}
          onPress={() => setShowAccounting(!showAccounting)}
        >
          <Text style={styles.billButtonText}>bill</Text>
        </TouchableOpacity>

        <Modal
          animationType="slide"
          transparent={true}
          visible={showAccounting}
          onRequestClose={closeModal}
        >
          <View style={modalStyles.modalOverlay}>
            <View style={[modalStyles.modalContent]}>
              <Text style={modalStyles.modalTitle}> Accounting Details </Text>
              {/* <Text style={modalStyles.modalText}>
                Here is the information you want to display.
              </Text> */}

              <View style={{ flexDirection: "row", marginBottom: 10 }}>
                <NewTransactionInput onAddTransaction={addTransaction} />
                <TouchableOpacity
                  onPress={() => handleSplitButton()}
                  style={[
                    modalStyles.splitButton,
                    { backgroundColor: "orange" },
                  ]}
                >
                  <Text style={modalStyles.splitButtonText}>Split bill</Text>
                </TouchableOpacity>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  flex: 1,
                  justifyContent: "center",
                }}
              >
                <View
                  style={{
                    flex: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    marginRight: 20,
                  }}
                >
                  <View
                    style={[
                      { flexDirection: "row", marginBottom: 10, width: 700 },
                      {
                        backgroundColor: "lightgrey",
                        paddingLeft: 5,
                        paddingRight: 10,
                      },
                    ]}
                  >
                    <Text style={[modalStyles.modalListTitle, { flex: 2 }]}>
                      {" "}
                      {"DateTime"}{" "}
                    </Text>
                    <Text style={[modalStyles.modalListTitle, { flex: 3 }]}>
                      {" "}
                      {"Title"}{" "}
                    </Text>
                    <Text style={[modalStyles.modalListTitle, { flex: 1 }]}>
                      {" "}
                      {"Payer"}{" "}
                    </Text>
                    <Text style={[modalStyles.modalListTitle, { flex: 3 }]}>
                      {" "}
                      {"Attendies"}{" "}
                    </Text>
                    <Text
                      style={[
                        modalStyles.modalListTitle,
                        { flex: 1, marginRight: 30 },
                      ]}
                    >
                      {" "}
                      {"Price"}{" "}
                    </Text>
                  </View>

                  <FlatList
                    data={transactions
                      .sort((a, b) => {
                        if (a.issplited === b.issplited) {
                          return a.datetime.localeCompare(b.datetime);
                        }
                        return a.issplited ? 1 : -1;
                      })
                      .filter((item) => item.issplited === false)}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                      <AccountListItem
                        datetime={item.datetime}
                        title={item.title}
                        payer={item.payer.toString()}
                        attendies={item.attendees_ids}
                        price={item.price}
                        isSplit={item.issplited}
                      />
                    )}
                  />
                </View>

                <View style={{ flex: 3, alignItems: "center" }}>
                  <View
                    style={[
                      { flexDirection: "row", marginBottom: 10, width: 400 },
                      {
                        backgroundColor: "lightgrey",
                        paddingLeft: 5,
                        paddingRight: 10,
                      },
                    ]}
                  >
                    <Text style={[modalStyles.modalListTitle, { flex: 4 }]}>
                      {" "}
                      {"From"}{" "}
                    </Text>
                    <Text style={[modalStyles.modalListTitle, { flex: 4 }]}>
                      {" "}
                      {"To"}{" "}
                    </Text>
                    <Text style={[modalStyles.modalListTitle, { flex: 3 }]}>
                      {" "}
                      {"Amount"}{" "}
                    </Text>
                  </View>

                  {splitTransactions.length === 0 && (
                    <Text style={modalStyles.modalText}>
                      No split transactions
                    </Text>
                  )}
                  <FlatList
                    data={splitTransactions}
                    keyExtractor={(item, idx) => `${Object.keys(item)}-${idx}`}
                    renderItem={({ item }) => (
                      <SplitListItem
                        from={item.from.toString()}
                        to={item.to.toString()}
                        amount={item.amount}
                      />
                    )}
                  />
                </View>
              </View>

              <TouchableOpacity
                onPress={closeModal}
                style={modalStyles.closeButton}
              >
                <Text style={modalStyles.closeButtonText}>Close</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>

        <TouchableOpacity style={styles.sendButton} onPress={handleSendMessage}>
          <Text style={styles.sendButtonText}>Send</Text>
        </TouchableOpacity>

        {/* Emoji board */}
        {/* <View style={styles.inputContainer}>
          <TouchableOpacity onPress={toggleEmojiBoard} style={styles.emojiButton}>
            <FontAwesome5 name="smile" size={24} color="black" />
          </TouchableOpacity>
          <TextInput
            style={styles.textInput}
            value={message}
            onChangeText={setMessage}
            placeholder="Type a message"
          />
        </View>
        {showEmojiBoard && <EmojiBoard showBoard={showEmojiBoard} onClick={addEmoji} />}
         */}
      </View>
    </View>
  );
}

const AccountListItem = ({
  datetime,
  title,
  payer,
  attendies,
  price,
  isSplit,
}: {
  datetime: string;
  title: string;
  payer: string;
  attendies: number[];
  price: number;
  isSplit: boolean;
}) => {
  {
    /* (`title`, `super_cid`, `payer`, `attendees_ids`, `price`, `issplited`) VALUES
  ('Dinner at Restaurant', 'crHjSb', 1, '2,3', 1200.50, FALSE), -- Alice 付錢，Bob 和 Charlie 分帳 */
  }

  const parseISODate = (isoDate: string) => {
    // parse ISO date string to "YYYY-MM-DD HH:MM:SS"
    const date = new Date(isoDate);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hour = date.getHours();
    const minute = date.getMinutes();
    const second = date.getSeconds();

    const padZero = (num: number) => {
      return num < 10 ? "0" + num : num;
    };

    return `${year}-${padZero(month)}-${padZero(day)} ${padZero(
      hour
    )}:${padZero(minute)}:${padZero(second)}`;
  };

  return (
    <View
      style={[
        { flexDirection: "row", marginBottom: 10, width: 700 },
        // { backgroundColor: isTitle ? 'lightgrey' : 'white' },
      ]}
    >
      <Text
        style={[
          modalStyles.modalText,
          { flex: 2, color: isSplit ? "blue" : "black" },
        ]}
      >
        {parseISODate(datetime)}
      </Text>
      <Text
        style={[
          modalStyles.modalText,
          { flex: 3, color: isSplit ? "lightblue" : "black" },
        ]}
      >
        {title}
      </Text>
      <Text
        style={[
          modalStyles.modalText,
          { flex: 1, color: isSplit ? "lightblue" : "black" },
        ]}
      >
        {payer}
      </Text>
      <Text
        style={[
          modalStyles.modalText,
          { flex: 3, color: isSplit ? "lightblue" : "black" },
        ]}
      >
        {attendies.join(", ")}
      </Text>
      <Text
        style={[
          modalStyles.modalText,
          { flex: 1, marginRight: 30, color: isSplit ? "lightblue" : "black" },
        ]}
      >
        {price}
      </Text>
    </View>
  );
};

const SplitListItem = ({
  from,
  to,
  amount,
}: {
  from: string;
  to: string;
  amount: number;
}) => {
  {
    /* (`title`, `super_cid`, `payer`, `attendees_ids`, `price`, `issplited`) VALUES
  ('Dinner at Restaurant', 'crHjSb', 1, '2,3', 1200.50, FALSE), -- Alice 付錢，Bob 和 Charlie 分帳 */
  }

  return (
    <View
      style={[
        { flexDirection: "row", marginBottom: 10, width: 400 },
        // { backgroundColor: isTitle ? 'lightgrey' : 'white' },
      ]}
    >
      <Text style={[modalStyles.modalText, { flex: 4 }]}>{from}</Text>
      <Text style={[modalStyles.modalText, { flex: 4 }]}>{to}</Text>
      <Text style={[modalStyles.modalText, { flex: 3 }]}>{amount}</Text>
    </View>
  );
};

const NotFoundChatroom = () => {
  const router = useRouter();
  const darkmode = true;
  return (
    <View style={[styles.container]}>
      {/* a stylish Not Found Page with Orange and Black and a cute icon */}
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: darkmode ? "#4F4C4A" : "#F6F6F6",
        }}
      >
        {/* A message */}
        {/* A Figure of a cute cat */}
        <FontAwesome5 name="cat" size={100} color="#FF8F3B" />
        <Text style={{ fontSize: 24, fontWeight: "bold", color: "white" }}>
          Oops...! Chatroom not found
        </Text>

        <TouchableOpacity
          onPress={() => router.navigate("/(tabs)/chatrooms")}
          style={{
            marginTop: 20,
            padding: 10,
            backgroundColor: "#FF8F3B",
            borderRadius: 10,
          }}
        >
          <Text style={{ fontSize: 18, color: "white" }}>Go back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
  },
  chatBackground: {
    color: "#f0f0f0",
    padding: 12,
    flex: 1,
  },
  messageContainer: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 10,
  },
  userMessage: {
    alignSelf: "flex-end",
    // backgroundColor: '#DCF8C6', // Light green
    backgroundColor: "#FFF0D3",
    borderWidth: 1,
    borderColor: "#fbc9a3",
  },
  otherMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ECECEC",
  },
  messageText: {
    fontSize: 16,
  },
  topbar: {
    height: 60,
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBlockColor: "black",
    borderBottomWidth: 1,
    backgroundColor: "#f0f0f0",
  },
  topbarTitle: {
    fontSize: 24,
    fontWeight: "bold",
    position: "absolute",
    left: 0,
    right: 0,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    marginRight: 10,
  },
  billButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 20,
    marginRight: 10,
  },
  billButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  sendButton: {
    backgroundColor: "#007AFF",
    padding: 10,
    borderRadius: 20,
  },
  sendButtonText: {
    color: "#fff",
    fontSize: 16,
  },
  emojiButton: {
    marginRight: 10,
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
  },
});

const modalStyles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "85%",
    padding: 20,
    height: "85%",
    backgroundColor: "#fff",
    borderRadius: 10,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 30,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalListTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 5,
    textAlign: "center",
    padding: 5,
  },
  modalText: {
    fontSize: 14,
    textAlign: "center",
    fontWeight: "bold",
    // backgroundColor: 'lightgrey',
    padding: 5,
  },
  closeButton: {
    backgroundColor: "#FF3B30",
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  splitButton: {
    backgroundColor: "blue",
    paddingHorizontal: 10,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    height: 42,
    marginHorizontal: 5,
  },
  splitButtonText: {
    color: "white",
    textAlign: "center",
  },
});
