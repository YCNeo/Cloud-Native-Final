import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import EventCard from "@/components/app/EventCard";

export default function NotiBoardPage() {
  const events = [
    {
      type: "Event",
      title: "EventName",
      details: ["Detail 1"],
      channelName: "Channel Name",
      time: "Now",
    },
    {
      type: "Group",
      title: "Archive Soon",
      details: ["Detail 1"],
      channelName: "Channel Name",
      time: "2hr ago",
    },
    {
      type: "System",
      title: "Login Alert",
      details: ["Detail 1"],
      channelName: "Channel Name",
      time: "3hr ago",
    },
  ];

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>NotiBoard</Text>
        <FlatList
          data={events}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <EventCard
              type={item.type}
              title={item.title}
              details={item.details}
              channelName={item.channelName}
              time={item.time}
            />
          )}
        />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#f39c12",
    marginBottom: 10,
  },
});
