import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { useRouter } from 'expo-router';

// app/index.tsx
export default function Home() {
  const router = useRouter();
    return (
      <View>
        <Text>Welcome to the Login Page</Text>
        
        {/* 子宏如果登入過程有其他頁的話，可以先 navigate 到其他頁 ex: 輸入密碼、忘記密碼...，
        最後登入成功在navigate 到 home page 就行 */}
        <Button title="Login" onPress={() => router.navigate('/(tabs)/home')} />
      
      </View>
    );
  }
  