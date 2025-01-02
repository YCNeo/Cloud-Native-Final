import React from "react";
import { Text, View, TouchableOpacity, Image, Pressable } from "react-native";
import styles from "./style";
import { Link } from "expo-router";

export default function Welcome() {
  return (
    <View style={styles.container}>
      {/* Title */}

      <Image
        source={require("../../assets/images/image.png")}
        style={styles.welcomeIcon}
      />
      <Text style={styles.title}>
        <Text style={{ color: "black" }}>Welcome to </Text>
        <Text style={{ color: "orange" }}>GroupUp!</Text>
      </Text>
      {/* Login Button */}
      <Link href="/loginPage/login" asChild>
        <Pressable style={styles.loginButton}>
          <Text style={styles.loginButtonText}>Login</Text>
        </Pressable>
      </Link>

      {/* create account Button */}
      <Link href="/loginPage/createAccount" asChild>
        <TouchableOpacity style={styles.createButton}>
          <Text style={styles.createButtonText}>Create an account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
