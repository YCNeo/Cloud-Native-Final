import React from "react";
import { Stack } from "expo-router";

const Layout = () => {
    return (
        <Stack>
            <Stack.Screen
                name="index"
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="notiBoard"
                options={{ headerShown: false, gestureEnabled: true }}
            />
            {/* <Stack.Screen
                name="purchase-point"
                options={{ headerShown: false, gestureEnabled: true }}
            />
            <Stack.Screen
                name="point-his"
                options={{ headerShown: false, gestureEnabled: true }}
            /> */}
        </Stack>
    );
};

export default Layout;
