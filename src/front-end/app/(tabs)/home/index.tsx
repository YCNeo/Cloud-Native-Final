// src/pages/HomePage.tsx
import React from 'react';
import { Link } from 'expo-router';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import EventCard from '@/components/app/EventCard';
import ServiceCard from '@/components/app/ServiceCard';


export default function HomePage() {
  const services = ['Template Converter', 'Recommend', 'Other'];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GroupUp</Text>
      {/* <Link href="/home/notiBoard"> */}
      <Link href={'/(tabs)/home/notiBoard'}>
        <EventCard
          type="Event"
          title="EventName"
          details={['Detail 1', 'Detail 2', 'Detail 3']}
          channelName="Channel Name"
          time="Now"
        />
      </Link>
      <TouchableOpacity style={styles.createGroup}>
        <Text style={styles.createText}>Create Group</Text>
      </TouchableOpacity>
      <Text style={styles.additionalTitle}>Additional Services</Text>
      <FlatList
        data={services}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <ServiceCard title={item} onPress={() => alert(`${item} clicked!`)} />
        )}
        numColumns={2}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#f39c12' },
  createGroup: {
    marginVertical: 10,
    padding: 15,
    borderRadius: 8,
    backgroundColor: '#ffdd99',
    alignItems: 'center',
  },
  createText: { color: '#e67e22', fontWeight: 'bold' },
  additionalTitle: { fontSize: 16, marginTop: 20, marginBottom: 10, color: '#7f8c8d' },
});