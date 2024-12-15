import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import { StyleSheet } from 'react-native';

import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';

// You can explore the built-in icon families and icons on the web at https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const textStyles = colorScheme === 'dark' ? styles.darkText : styles.lightText
  const iconColor = colorScheme === 'dark' ? 'white' : 'black'
  const tabbarStyles =
    colorScheme === 'dark' ? styles.darkTabbar : styles.lightTabbar
  
  return (
    <>
      <Tabs
        screenOptions={{
          // tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
          // Disable the static render of the header on web
          // to prevent a hydration error in React Navigation v6.
          tabBarStyle: {
            borderColor: 'gray',
            borderTopWidth: 1,
            shadowColor: 'black', // Shadow color
            shadowOpacity: 0.25, // Shadow opacity (0.0 to 1.0)
            shadowOffset: { width: 0, height: 2 }, // Shadow offset (width, height)
            shadowRadius: 4, // Shadow blur radius
            elevation: 5, // Android shadow elevation (works on Android API level 21 and above)
            alignItems: 'center',
          },
          headerShown: false,
        }}>
        <Tabs.Screen
          name="home"
          options={{
            href: "/(tabs)/home",
            tabBarStyle: tabbarStyles,

            //tabBar label
            tabBarLabel: '首頁',
            tabBarLabelStyle: textStyles,
            //icon
            tabBarIcon: () => <TabBarIcon name="home" color={iconColor} />,
          }}
        />
        <Tabs.Screen
          name="group"
          options={{
            href: "/(tabs)/group",
            tabBarStyle: tabbarStyles,

            //tabBar label
            tabBarLabel: '群組',
            tabBarLabelStyle: textStyles,
            //icon
            tabBarIcon: () => <TabBarIcon name="group" color={iconColor} />,
          }}
        />
        <Tabs.Screen
          name="friend"
          options={{
            href: "/(tabs)/friend",
            tabBarStyle: tabbarStyles,

            //tabBar label
            tabBarLabel: 'friend',
            tabBarLabelStyle: textStyles,
            //icon
            tabBarIcon: () => <TabBarIcon name="users" color={iconColor} />,
          }}
        />
        <Tabs.Screen
          name="intro"
          options={{
            href: "/(tabs)/intro",
            tabBarStyle: tabbarStyles,

            //tabBar label
            tabBarLabel: '個人介紹',
            tabBarLabelStyle: textStyles,
            //icon
            tabBarIcon: () => <TabBarIcon name="user" color={iconColor} />,
          }}
        />
      </Tabs>
    </>
  );
}



const styles = StyleSheet.create({
  lightText: {
    color: '#000',
    fontSize: 8,
  },
  darkText: {
    color: '#fff',
    fontSize: 8,
  },
  lightTabbar: {
    height: 80,
    backgroundColor: '#ffffff',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 6,
    shadowRadius: 2,
  },
  darkTabbar: {
    height: 80,
    backgroundColor: '#232323',
    shadowColor: 'rgba(0, 0, 0, 0.25)',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 6,
    shadowRadius: 2,
  },
})
