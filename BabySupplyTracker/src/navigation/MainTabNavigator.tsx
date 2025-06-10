import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'react-native';

import InventoryListScreen from '../screens/Inventory/InventoryListScreen';

import LoginScreen from '@/screens/LoginScreen';


const Tab = createBottomTabNavigator();


export default function MainTabNavigator() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="InventoryList" component={InventoryListScreen} options={{ tabBarLabel: "Inventory List" }} />
            <Tab.Screen name="LogIn" component={LoginScreen} options={{ tabBarLabel: "LogIn" }} />
        </Tab.Navigator>
    )



}