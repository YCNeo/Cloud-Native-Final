import React from 'react';
import { View, StyleSheet } from 'react-native';
import Card from '@/components/app/Card';
import ListItem from '@/components/app/ListItem';

export default function Groups() {
  const categories = [
    { title: '分類 1', channels: ['Channel 1.1', 'Channel 1.2', 'Channel 1.3'] },
    { title: '分類 2', channels: ['Channel 2.1', 'Channel 2.2', 'Channel 2.3'] },
  ];

  return (
    <View style={styles.container}>
      {categories.map((category, index) => (
        <Card key={index} title={category.title}>
          {category.channels.map((channel, idx) => (
            <ListItem key={idx} title={channel} onPress={() => {}} />
          ))}
        </Card>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
