import React, { useState } from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { login, signUp } from '../services/firebase/authService';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    //TODO: onAuthStateChanged: 현재 로그인/아닌지..

    const handleSignUp = async () => {
        try {
            await signUp(email, password);

        } catch (err) {
            console.error("Signup Fail: ", err);
        }
    }

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
            <Button onPress={handleSignUp}>Sign Up</Button>
        </View>
    )

}