import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { Text } from 'react-native';

import InventoryListScreen from '../screens/Inventory/InventoryListScreen';

import LoginScreen from '@/screens/LoginScreen';
import { useAuth } from '../context/AuthContext';
import ProfileScreen from '@/screens/ProfileScreen';

import { onAuthStateChanged } from 'firebase/auth';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();


export default function MainTabNavigator() {

    const { user } = useAuth();

    return (
        <Tab.Navigator
            screenOptions={{
                // headerShown: false,
                tabBarActiveTintColor: '#DA6C6C',
                tabBarInactiveTintColor: '#aaa',
            }}>
            <Tab.Screen name="InventoryList" component={InventoryListScreen} options={{
                tabBarLabel: "Inventory List", tabBarIcon: ({ color, size }) => (
                    <Icon name="clipboard-list" color={color} size={size} />
                ),
            }} />

            {/* depending on logged in or not, Log in page OR My Page  */}
            {user ? (
                <Tab.Screen name="MyPage" component={ProfileScreen} options={{
                    tabBarLabel: "Profile", tabBarIcon: ({ color, size }) => (
                        <Icon name="account-circle" color={color} size={size} />
                    ),
                }} />
            ) : <Tab.Screen name="LogIn" component={LoginScreen} options={{
                tabBarLabel: "LogIn", tabBarIcon: ({ color, size }) => (
                    <Icon name="login" color={color} size={size} />
                ),
            }} />}



        </Tab.Navigator>
    )



}