import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Button } from "react-native";


import RootNavigator from "./navigation/RootNavigator";
import { InventoryProvider } from "./context/InventoryContext";
import { PaperProvider } from "react-native-paper";


export default function App() {
    return (
        <PaperProvider>


            <InventoryProvider>
                <NavigationContainer>
                    <RootNavigator />
                </NavigationContainer>
            </InventoryProvider>
        </PaperProvider>
    );
}
