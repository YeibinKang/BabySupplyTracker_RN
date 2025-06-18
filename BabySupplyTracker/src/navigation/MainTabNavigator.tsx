import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'react-native';

import InventoryListScreen from '../screens/Inventory/InventoryListScreen';

import LoginScreen from '@/screens/LoginScreen';
import { useAuth } from '../context/AuthContext';
import ProfileScreen from '@/screens/ProfileScreen';

import { onAuthStateChanged } from 'firebase/auth';


const Tab = createBottomTabNavigator();


export default function MainTabNavigator() {

    const { user } = useAuth();

    return (
        <Tab.Navigator>
            <Tab.Screen name="InventoryList" component={InventoryListScreen} options={{ tabBarLabel: "Inventory List" }} />

            {/* depending on logged in or not, Log in page OR My Page  */}
            {user ? (
                <Tab.Screen name="MyPage" component={ProfileScreen} options={{ tabBarLabel: "Profile" }} />
            ) : <Tab.Screen name="LogIn" component={LoginScreen} options={{ tabBarLabel: "LogIn" }} />}



        </Tab.Navigator>
    )



}