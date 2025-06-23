import React, { useState } from 'react';
import { View, Linking, StyleSheet, KeyboardAvoidingView, Platform, ScrollView, Alert } from 'react-native';
import { TextInput, Button, Text, Divider } from 'react-native-paper';
import { login } from '../services/firebase/authService';
import { useRoute, useNavigation } from "@react-navigation/native";

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigation = useNavigation();

    const handleLogin = async () => {
        try {
            await login(email, password);
            Alert.alert("Login Successful", "Welcome back!", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("MainTabs", { screen: "InventoryList" });
                    }
                }
            ]);
        } catch (err) {
            console.error("Login Fail: ", err);
            Alert.alert("Login Failed", "Please check your email and password and try again.\n" + err.message);
        }
    }



    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={loginStyles.scrollContainer}>
                <View style={loginStyles.card}>
                    <Text style={loginStyles.title}>Log in</Text>
                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={loginStyles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        mode="outlined"
                        style={loginStyles.input}
                    />
                    <Button
                        mode="contained"
                        style={loginStyles.button}
                        onPress={handleLogin}
                    >
                        Login
                    </Button>
                    <View style={loginStyles.linkContainer}>
                        <Text style={loginStyles.linkText}>
                            Don't have an account?{' '}
                            <Text
                                style={{ color: 'red' }}
                                onPress={() => navigation.navigate("SignUp")}
                            >
                                Sign Up
                            </Text>
                        </Text>
                    </View>
                </View>

                <Text style={{ marginTop: 20, textAlign: 'center' }}>
                    You can share the inventory with your family!
                </Text>
                <Divider style={{ marginVertical: 20 }} />
                <View style={{ padding: 16 }}>
                    <Text style={{ textAlign: 'center', marginBottom: 8 }}>
                        For any questions or feedback,
                    </Text>
                    <Text
                        onPress={() => Linking.openURL('mailto:dev.yeibin@gmail.com')}
                        style={{ textAlign: 'center', color: 'blue', textDecorationLine: 'underline' }}
                    >
                        dev.yeibin@gmail.com
                    </Text>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const loginStyles = StyleSheet.create({
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        paddingHorizontal: 24,
        backgroundColor: '#f7f7f7',
    },
    card: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        padding: 24,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.1,
        shadowRadius: 6,
        elevation: 4,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        textAlign: 'center',
        color: '#333',
    },
    input: {
        marginBottom: 12,
        backgroundColor: '#fff',
    },
    button: {
        marginTop: 16,
        paddingVertical: 8,
        borderRadius: 8,
    },
    linkContainer: {
        marginTop: 12,
        alignItems: 'center',
    },
    linkText: {
        color: '#7a7a7a',
        fontSize: 14,
    },
});
