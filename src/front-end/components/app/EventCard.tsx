// src/components/EventCard.tsx
import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

interface EventCardProps {
  type: string; // Event, Group, System
  title: string;
  details: string[];
  channelName: string;
  time: string;
}

const EventCard: React.FC<EventCardProps> = ({ type, title, details, channelName, time }) => {
  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.type}>{type}</Text>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.time}>{time}</Text>
      </View>
      <View style={styles.body}>
        {details.map((detail, index) => (
          <Text key={index} style={styles.detail}>{detail}</Text>
        ))}
        <Text style={styles.channel}>{channelName}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 10,
    marginVertical: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  type: { fontWeight: 'bold', color: '#f39c12' },
  title: { flex: 1, marginLeft: 10, fontSize: 16 },
  time: { color: '#7f8c8d' },
  body: { marginTop: 10 },
  detail: { color: '#34495e' },
  channel: { marginTop: 5, fontStyle: 'italic', color: '#2ecc71' },
});

export default EventCard;
