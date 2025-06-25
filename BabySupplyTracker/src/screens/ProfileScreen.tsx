import { View, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from "react-native";
import { useAuth } from "../context/AuthContext";
import { Card, Text, Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { signOut } from "firebase/auth";

export default function ProfileScreen() {
    const { user } = useAuth();
    const navigation = useNavigation();

    const handleLogOutPressed = () => {
        signOut(user.auth)
            .then(() => {
                console.log("User signed out successfully");
                navigation.navigate("LogIn");
            })
            .catch((error) => {
                console.error("Error signing out: ", error);
            });
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1 }}
        >
            <ScrollView contentContainerStyle={styles.container}>
                <View style={styles.card}>
                    <Text style={styles.title}>My Profile</Text>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.text}>{user.email}</Text>
                    <Text style={styles.label}>User Name</Text>
                    <Text style={styles.text}>{user.displayName || 'N/A'}</Text>

                    <Button
                        mode="contained"
                        style={styles.button}
                        buttonColor="#DA6C6C"
                        onPress={handleLogOutPressed}
                    >
                        Log Out
                    </Button>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
}


const styles = StyleSheet.create({
    container: {
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
        marginBottom: 20,
        textAlign: 'center',
        color: '#333',
    },
    label: {
        fontSize: 14,
        color: '#888',
        marginTop: 8,
    },
    text: {
        fontSize: 16,
        marginBottom: 8,
        color: '#000',
    },
    button: {
        marginTop: 24,
        paddingVertical: 8,
        borderRadius: 8,
    },
});
