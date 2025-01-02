import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useRouter } from "expo-router";
import { useEffect } from "react";
import Welcome from "./loginPage/welcome";
// app/index.tsx
export default function Home() {
  const router = useRouter();

  return <Welcome />;
}
