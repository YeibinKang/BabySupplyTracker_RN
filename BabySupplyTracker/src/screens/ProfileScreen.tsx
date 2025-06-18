import { View, StyleSheet } from "react-native";
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

    }

    return (





        // user information - name, email
        <View >

            <Card style={styles.card}>
                <View style={styles.cardContent}>

                    <View style={styles.textContent}>
                        <Text>User Email: {user.email}</Text>
                        <Text>User Name: {user.displayName}</Text>

                    </View>

                </View>

            </Card>


            <View style={styles.buttonContainer}>

                <Button mode="contained" buttonColor="red" style={styles.button} onPress={handleLogOutPressed}>
                    Logout
                </Button>
            </View>

        </View>


    );
}


const styles = StyleSheet.create({

    card: {
        marginHorizontal: 16,
        marginVertical: 8,
        borderRadius: 12,
        padding: 12,
        backgroundColor: '#FDFAF6',
    },
    cardContent: {
        flexDirection: 'row',
        alignItems: 'flex-start',

    },
    title: {
        fontWeight: 'bold',
        marginBottom: 4,
    },


    textContent: {
        flex: 1,
    },
    cardTitle: {
        fontWeight: 'bold',
        marginBottom: 4,
        fontSize: 16,
    },
    floatingButton: {
        position: 'absolute',
        right: 20,
        bottom: 50,
        backgroundColor: '#DA6C6C',
        borderRadius: 30,
        padding: 16,
        elevation: 5, // 안드로이드 그림자
        shadowColor: '#000', // iOS 그림자
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.5,
        zIndex: 1000
    },


    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        marginHorizontal: 10,
    },


});