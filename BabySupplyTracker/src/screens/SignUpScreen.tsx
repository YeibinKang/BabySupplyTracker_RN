import React, { useState } from 'react';
import { View, Alert } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { login, signUp } from '../services/firebase/authService';
import { useRoute, useNavigation } from "@react-navigation/native";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const route = useRoute();
    const navigation = useNavigation();


    const handleSignUp = async () => {
        try {
            await signUp(email, password, displayName);
            Alert.alert("Signup Successful", "You can now log in with your new account.", [
                {
                    text: "OK",
                    onPress: () => {
                        // Navigate to login screen or home screen
                        // navigation.navigate("Login");
                        navigation.navigate("MainTabs", { screen: "InventoryList" });
                    }
                }
            ]);

        } catch (err) {
            console.error("Signup Fail: ", err);
            Alert.alert("Signup Failed", "Please check your input and try again." + err.message);
        }
    }



    return (
        <View style={{ padding: 20 }}>
            <TextInput label="Email" value={email} onChangeText={setEmail} />
            <TextInput label="Password" value={password} secureTextEntry onChangeText={setPassword} />
            <TextInput label="Display Name" value={displayName} onChangeText={setDisplayName} />
            <Button onPress={handleSignUp}>Sign Up</Button>
        </View>
    )

}