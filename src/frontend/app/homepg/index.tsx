import { useEffect } from 'react';
import { useRouter } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Text, View, TextInput, TouchableOpacity, Image, Pressable } from 'react-native';
export default function HomePage () {
  const router = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('jwtToken');
      if (!token) {
        router.push('/loginPage/welcome'); // 沒有 token，跳轉到登入頁面
      }
      // 可加上對 token 的有效性驗證
    };
    checkToken();
  }, []);

  return (
    <View>
      <Text>Home Page</Text>
    </View>
  );
};
