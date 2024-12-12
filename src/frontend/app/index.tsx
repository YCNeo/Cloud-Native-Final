
import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import styles from './loginPage/style.ts';
import { Router, Link } from "expo-router";


export default function index() { 

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Index</Text>
      <Link href="/loginPage/welcome">welcome</Link>
    </View>
  );
}

