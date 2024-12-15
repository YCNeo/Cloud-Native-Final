import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function IntroPage() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Personal Info</Text>
      <Text>Welcome to your personal info page!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});
