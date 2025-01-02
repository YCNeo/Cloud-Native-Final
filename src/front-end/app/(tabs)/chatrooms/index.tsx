import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
  Modal,
  Button,
} from "react-native";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import io from "socket.io-client";
import axios from "axios";
import { apiServer, socketServer } from "@/constants/backendURL";

interface ChatroomProps {
  id: number;
  room_id: number;
  name: string;
}

const username = "User";

const chatrooms: ChatroomProps[] = [
  {
    id: 1,
    room_id: 1,
    name: "Chatroom 1r3",
  },
  {
    id: 2,
    room_id: 2,
    name: "Chatroom 2",
  },
  {
    id: 3,
    room_id: 3,
    name: "Chatroom 3",
  },
  {
    id: 4,
    room_id: 4,
    name: "Chatroom 4",
  },
];

const socket = io(socketServer);

export default function Chatrooms() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [userdata, setUserdata] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [chatrooms, setChatrooms] = useState<ChatroomProps[]>([
    // {
    //   id: 1,
    //   room_id: 1,
    //   name: "Chatroom 1",
    // },
    // {
    //   id: 2,
    //   room_id: 2,
    //   name: "Chatroom 2",
    // },
    // {
    //   id: 3,
    //   room_id: 3,
    //   name: "Chatroom 3",
    // },
    // {
    //   id: 4,
    //   room_id: 4,
    //   name: "Chatroom 4",
    // },
  ]);
  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("jwtToken");
      console.log("Token:", token);
      if (token) {
        try {
          const response = await axios.post(`${apiServer}/auth/vertifyToken`, {
            JWTtoken: token,
          });
          setUserdata(response.data);
          localStorage.setItem("userdata", JSON.stringify(response.data));
          console.log("Token exists", response.data);
        } catch (error) {
          console.error("checkTokenError:", error);
          localStorage.removeItem("jwtToken");
          await router.push("/loginPage/login");
        }
      } else {
        await router.push("/loginPage/login");
      }
    };

    checkToken();
  }, [router]);

  useEffect(() => {
    if (userdata) {
      const fetchChatrooms = async () => {
        try {
          const response = await axios.post(
            `${apiServer}/chatroom/userGetChatroomRedis`,
            {
              user: userdata.userID, // 使用從 token 中獲取的使用者 ID
            }
          );
          const newChatrooms = response.data.map(
            (chatroom: any, index: number) => ({
              id: index,
              room_id: chatroom.chatroomID,
              name: chatroom.name,
            })
          );
          const uniqueChatrooms = newChatrooms.filter(
            (chatroom: ChatroomProps, index: number, self: ChatroomProps[]) =>
              index === self.findIndex((c) => c.room_id === chatroom.room_id)
          );

          setChatrooms(uniqueChatrooms);
          console.log("HAHA!", uniqueChatrooms);
        } catch (error) {
          console.error("Error fetching chatrooms", error);
        }
      };

      fetchChatrooms();
    }
  }, [userdata]);

  const handlePress = (room_id: number) => {
    console.log(`Joining chatroom ${room_id}`);
    router.push(`./chatrooms/${room_id}`);
  };

  const handleSearch = () => {
    const chatroom = chatrooms.find(
      (room) => room.name.toLowerCase() === search.toLowerCase()
    );
    if (chatroom) {
      handlePress(chatroom.room_id);
    } else {
      socket.emit("checkRoom", search, (exists: boolean) => {
        Alert.alert(
          "Create Chatroom",
          `The chatroom "${search}" does not exist. Do you want to create it?`,
          [
            { text: "No", style: "cancel" },
            {
              text: "Yes",
              onPress: () => {
                const newRoom = {
                  id: chatrooms.length + 1,
                  room_id: chatrooms.length + 1,
                  name: search,
                };
                chatrooms.push(newRoom);
                handlePress(newRoom.room_id);
              },
            },
          ]
        );
      });
    }
  };

  const [modalVisible, setModalVisible] = useState(false);
  const [chatroomName, setChatroomName] = useState("");
  const [randomCode, setRandomCode] = useState("");

  async function generateCode() {
    const chars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    let code = "";
    const res = await axios.get(`${apiServer}/chatroom/getChatrooms`);
    console.log(res.data);

    let uniqueFound = false;
    do {
      code = "";
      for (let i = 0; i < 5; i++) {
        code += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      uniqueFound = !res.data.includes(code);
    } while (!uniqueFound);
    setRandomCode(code);
    setModalVisible(true);
  }

  const confirmChatroom = () => {
    const parsedUserData = JSON.parse(localStorage.getItem("userData") || "{}");
    axios.post(`${apiServer}/chatroom/createChatroom`, {
      roomId: randomCode,
      roomName: chatroomName,
      userId: userdata.userID,
      userName: userdata.username,
    });
    console.log(`Chatroom ${randomCode}:${chatroomName} created`);
    setChatroomName("");
    setModalVisible(false);
  };

  return (
    <View style={styles.container}>
      {/* Topbar */}
      <View style={styles.topbar}>
        <Text style={styles.topbarTitle}>{"Groups"}</Text>
        {/* <TouchableOpacity onPress={ () => router.navigate("/(tabs)/chatrooms") } style={{ marginRight: 20, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ marginRight: 15 }}>
            <FontAwesome5 name="arrow-left" size={24} color="black" />
          </View>
          <Text style={{ fontSize: 22, fontWeight: 'bold' }}>{"Back"}</Text>
        </TouchableOpacity>   */}
      </View>

      {/* Add a search Text input */}
      <View style={styles.searchContainer}>
        <View style={{ marginRight: 10 }}>
          <FontAwesome5 name="search" size={24} color="black" />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search chatrooms..."
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.searchButton, { backgroundColor: "#28a745" }]}
          onPress={async () => {
            setShowModal(true);
            await generateCode();
          }}
        >
          <Text style={styles.searchButtonText}>Create chatroom</Text>
        </TouchableOpacity>
        {showModal && (
          <Modal visible={modalVisible} transparent animationType="slide">
            <View style={styles.modalBackground}>
              <View style={styles.modalContent}>
                <Text>Room Code: {randomCode}</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Chatroom Name"
                  value={chatroomName}
                  onChangeText={setChatroomName}
                />
                <Button title="Confirm" onPress={confirmChatroom} />
              </View>
            </View>
          </Modal>
        )}
      </View>

      <FlatList
        data={chatrooms}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.chatroom}
            onPress={() => handlePress(item.room_id)}
          >
            <Text style={styles.name}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // padding: 16,
    backgroundColor: "#fff",
  },
  chatroom: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
  },
  description: {
    fontSize: 14,
    color: "#666",
  },
  topbar: {
    flexDirection: "row",
    height: 60,
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
  searchContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    height: 60,
    justifyContent: "center",
    alignItems: "center",
    borderBottomWidth: 2,
    paddingBottom: 15,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    fontSize: 18,
  },
  searchButton: {
    marginLeft: 10,
    padding: 10,
    backgroundColor: "#007bff",
    borderRadius: 5,
  },
  searchButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 5,
  },
  input: {
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    width: "100%",
  },
});
