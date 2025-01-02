import React, { useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
  Pressable,
} from "react-native";
import styles from "./style";
import { Stack, useRouter, Navigator, router, Link } from "expo-router";
import axios from "axios";
import CryptoJS from "crypto-js";
import AntDesign from "@expo/vector-icons/AntDesign";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";

export default function login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const frontendRouter = useRouter();

  useEffect(() => {
    const checkToken = async () => {
      const token = localStorage.getItem("jwtToken");
      console.log("Token:", token);       
      if (token) {
        try {
          const response = await axios.post(`http://13.211.30.75:8000/auth/vertifyToken`, {JWTtoken: token});
          const resposeTmp = response;
          console.log(response);
          console.log("Token exists", resposeTmp);
          await frontendRouter.navigate("/(tabs)/chatrooms");
        } catch (error) {
          console.error("checkTokenError:", error);
          localStorage.removeItem("jwtToken");
        }
      }
    };
    checkToken();
  });

  const handleLogin = async (email: string, password: string) => {
    const hashedPassword = CryptoJS.SHA256(password).toString(CryptoJS.enc.Hex);
    try {
      const response = await axios.post(`http://13.211.30.75:8000/auth/login`, {
        email: email,
        password: hashedPassword,
      });
      if (response.status === 200) {
        const jwtToken = response.data.jwttok;

        // 存入 SecureStore        
        localStorage.setItem("jwtToken", jwtToken);
        console.log("Token saved to localstorage");
        frontendRouter.navigate("/(tabs)/chatrooms");
      } else if (response.status === 401) {
        // Alert.alert('Login Failed', 'Invalid email or password. Please try again.');
        // window.alert('Login Failed Invalid email or password. Please try again.')
        console.log("登入錯誤：");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleGoogleLogin = async () => {
    await console.log("E04");
  };

  return (
    <View style={styles.container}>
      {/* Title */}
      <Text style={styles.title}>Login</Text>
      <Text style={styles.subtitle}>Welcome back to GroupUp</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="example@gmail.com"
          placeholderTextColor="#bdbdbd"
          keyboardType="email-address"
          value={email}
          onChangeText={(text) => setEmail(text)}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.inputLabel}>Password</Text>
        <View style={styles.passwordContainer}>
          <TextInput
            style={styles.input}
            placeholder="••••••••••"
            placeholderTextColor="#bdbdbd"
            secureTextEntry={!passwordVisible}
            value={password}
            onChangeText={(text) => setPassword(text)}
          />
          <TouchableOpacity
            onPress={() => setPasswordVisible(!passwordVisible)}
            style={styles.eyeIconContainer}
          >
            <Text style={styles.eyeIcon}>{passwordVisible ? "👁️" : "👁️‍🗨️"}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Keep me logged in & Forgot Password */}
      <View style={styles.optionsContainer}>
        <TouchableOpacity>
          <Text style={styles.optionText}>Keep me logged in</Text>
        </TouchableOpacity>
        <TouchableOpacity>
          <Text style={[styles.optionText, styles.forgotPassword]}>
            Forget Password?
          </Text>
        </TouchableOpacity>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={function () {
          handleLogin(email, password);
        }}
      >
        <Text style={styles.loginButtonText}>Login</Text>
      </TouchableOpacity>

      {/* Social Media Login */}
      {/* <View style={styles.socialContainer}>
        <View style={styles.divider}>
          <Text style={styles.dividerText}>or sign in with</Text>
        </View>
        <View style={styles.socialIcons}>
          <TouchableOpacity onPress={() => {console.log("Apple login")}}>
            <AntDesign name="apple1" size={24} color="black"  />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => {console.log("fb login")}}>
          <AntDesign name="facebook-square" size={24} color="black" />
          </TouchableOpacity>
          <TouchableOpacity onPress={() =>  handleGoogleLogin() }>
            <AntDesign name="google" size={24} color="black" />
          </TouchableOpacity>
        </View>
      </View> */}

      {/* Create Account */}
      <Link href="/loginPage/createAccount" asChild>
        <TouchableOpacity>
          <Text style={styles.createAccount}>Create an Account</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}
