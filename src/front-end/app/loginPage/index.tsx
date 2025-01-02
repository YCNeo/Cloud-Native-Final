import React from "react";
import { Text, View } from "react-native";
import styles from "./style";

import { Link } from "expo-router";

export default function index() {
  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>GroupUp!</Text>
      <Text style={styles.subtitle}>Welcome back to GroupUp</Text>
      <Text style={styles.subtitle}>loginPage</Text>
      <Link href="/">Home</Link>
    </View>
  );
}
