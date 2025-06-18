import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

import MainTabNavigator from "./MainTabNavigator";
import ItemDetailScreen from "../screens/Inventory/ItemDetailScreen";
import ItemEditScreen from "../screens/Inventory/ItemEditScreen";
import ItemAddScreen from "../screens/Inventory/ItemAddScreen";
import SignUpScreen from "../screens/SignUpScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="MainTabs"
                component={MainTabNavigator}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="ItemDetail"
                component={ItemDetailScreen}
                options={{ title: "Item Detail" }}
            />
            <Stack.Screen
                name="ItemEdit"
                component={ItemEditScreen}
                options={{ title: "Edit Item" }}
            />
            <Stack.Screen
                name="ItemAdd"
                component={ItemAddScreen}
                options={{ title: "Add Item" }}>

            </Stack.Screen>
            <Stack.Screen
                name="SignUp"
                component={SignUpScreen}
                options={{ title: "Sign Up" }}
            />
            <Stack.Screen
                name="LogIn"
                component={LoginScreen}
                options={{ title: "Log In" }}
            />

        </Stack.Navigator>
    );
}