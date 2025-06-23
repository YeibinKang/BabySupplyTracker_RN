import React, { useState } from 'react';
import {
    View,
    Alert,
    StyleSheet,
    KeyboardAvoidingView,
    Platform,
    ScrollView
} from 'react-native';
import { TextInput, Button, Text, Divider } from 'react-native-paper';
import { signUp } from '../services/firebase/authService';
import { useNavigation } from "@react-navigation/native";

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const navigation = useNavigation();

    const handleSignUp = async () => {
        try {
            await signUp(email, password, displayName);
            Alert.alert("Signup Successful", "You can now log in with your new account.", [
                {
                    text: "OK",
                    onPress: () => {
                        navigation.navigate("MainTabs", { screen: "InventoryList" });
                    }
                }
            ]);
        } catch (err) {
            console.error("Signup Fail: ", err);
            Alert.alert("Signup Failed", "Please check your input and try again.\n" + err.message);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={signUpStyles.scrollContainer}>
                <View style={signUpStyles.card}>
                    <Text style={signUpStyles.title}>Sign Up</Text>

                    <TextInput
                        label="Email"
                        value={email}
                        onChangeText={setEmail}
                        mode="outlined"
                        style={signUpStyles.input}
                    />
                    <TextInput
                        label="Password"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        mode="outlined"
                        style={signUpStyles.input}
                    />
                    <TextInput
                        label="User Name"
                        value={displayName}
                        onChangeText={setDisplayName}
                        mode="outlined"
                        style={signUpStyles.input}
                    />

                    <Button
                        mode="contained"
                        style={signUpStyles.button}
                        onPress={handleSignUp}
                    >
                        Sign Up
                    </Button>

                    <View style={signUpStyles.linkContainer}>
                        <Text style={signUpStyles.linkText}>
                            Already have an account?{" "}
                            <Text
                                style={{ color: 'red' }}
                                onPress={() => navigation.navigate("LogIn")}
                            >
                                Log In
                            </Text>
                        </Text>
                    </View>

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

                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}

const signUpStyles = StyleSheet.create({
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



// import React, { useState } from 'react';
// import { View, Alert } from 'react-native';
// import { TextInput, Button, Text } from 'react-native-paper';
// import { login, signUp } from '../services/firebase/authService';
// import { useRoute, useNavigation } from "@react-navigation/native";

// export default function SignUp() {
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [displayName, setDisplayName] = useState('');
//     const route = useRoute();
//     const navigation = useNavigation();


//     const handleSignUp = async () => {
//         try {
//             await signUp(email, password, displayName);
//             Alert.alert("Signup Successful", "You can now log in with your new account.", [
//                 {
//                     text: "OK",
//                     onPress: () => {
//                         // Navigate to login screen or home screen
//                         // navigation.navigate("Login");
//                         navigation.navigate("MainTabs", { screen: "InventoryList" });
//                     }
//                 }
//             ]);

//         } catch (err) {
//             console.error("Signup Fail: ", err);
//             Alert.alert("Signup Failed", "Please check your input and try again." + err.message);
//         }
//     }



//     return (
//         <View style={{ padding: 20 }}>
//             <TextInput label="Email" value={email} onChangeText={setEmail} />
//             <TextInput label="Password" value={password} secureTextEntry onChangeText={setPassword} />
//             <TextInput label="Display Name" value={displayName} onChangeText={setDisplayName} />
//             <Button onPress={handleSignUp}>Sign Up</Button>
//         </View>
//     )

// }