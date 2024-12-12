
  import React, { useState } from 'react';
  import {Text, View, TouchableOpacity, Image, requireNativeComponent, Pressable } from 'react-native';
  import styles from './style.ts';
  import { Router, Link } from "expo-router";


  export default function welcome() { 

    return (
      <View style={styles.container}>
        {/* Title */}
        

        <Image source={require("../../assets/image.png")} style={styles.welcomeIcon}/>
        <Text style={styles.title}>
          <Text style={{ color: 'black' }}>Welcome to </Text>
          <Text style={{ color: 'orange' }}>GroupUp!</Text>
        </Text>
        {/* Login Button */}
        <Link href="loginPage/login" asChild>
         <Pressable style={styles.loginButton }>
           <Text style={styles.loginButtonText}>Login</Text>
         </Pressable>
        </Link>
       
        {/* create account Button */}
        <Link href="loginPage/createAccount" asChild>
        <TouchableOpacity style={styles.createButton }>
          <Text style={styles.createButtonText}>Create an account</Text>
        </TouchableOpacity>
        </Link>
        
      </View>
    );
  }
  
