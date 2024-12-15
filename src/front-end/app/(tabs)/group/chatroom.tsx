import React from "react";
import { View, StyleSheet } from "react-native";
import Card from "@/components/app/Card";
import ListItem from "@/components/app/ListItem";

export default function Chatroom() {
  const messages = [
    { user: "User 1", content: "Message 1" },
    { user: "User 2", content: "Message 2" },
    { user: "User 3", content: "Message 3" }
    ];

    return (
        <View style={styles.container}>
            {messages.map((message, index) => (
            <Card key={index} title={message.user}>
                <ListItem title={message.content} onPress={() => {}} />
            </Card>
            ))}
        </View>
        );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff"
  }
});