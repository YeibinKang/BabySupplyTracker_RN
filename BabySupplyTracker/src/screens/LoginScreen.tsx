import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { login } from '../services/firebase/authService';
import { useRoute, useNavigation } from "@react-navigation/native";


export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const route = useRoute();
    const navigation = useNavigation();


    const handleLogin = async () => {
        try {
            await login(email, password);
            // Handle successful login, e.g., navigate to home screen
        } catch (err) {
            console.error("Login Fail: ", err);
            // Handle login error, e.g., show an alert
        }
    }



    return (
        <View style={{ padding: 20 }}>
            <TextInput label="Email" value={email} onChangeText={setEmail} />
            <TextInput label="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <Button mode="contained" onPress={handleLogin}>Login</Button>
            <Text style={{ marginTop: 20, textAlign: 'center' }}>Don't have an account? <Text style={{ color: 'red' }} onPress={() => navigation.navigate("SignUp")}>Sign Up</Text></Text>
            <Text style={{ textAlign: 'center' }}>You can share the inventory with your family!</Text>
        </View >
    )

}