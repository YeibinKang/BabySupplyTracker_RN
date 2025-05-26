import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'react-native';

import InventoryListScreen from '../screens/Inventory/InventoryListScreen';
import ProfileScreen from '../screens/ProfileScreen';


const Tab = createBottomTabNavigator();


export default function MainTabNavigator() {

    return (
        <Tab.Navigator>
            <Tab.Screen name="InventoryList" component={InventoryListScreen} options={{ tabBarLabel: "Inventory List" }} />
            <Tab.Screen name="Profile" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
        </Tab.Navigator>
    )



}