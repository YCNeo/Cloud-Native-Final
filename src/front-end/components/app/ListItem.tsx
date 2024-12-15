import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

interface ListItemProps {
  title: string;
  onPress?: () => void;
}

export default function ListItem({ title, onPress }: ListItemProps) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  text: {
    fontSize: 16,
  },
});
