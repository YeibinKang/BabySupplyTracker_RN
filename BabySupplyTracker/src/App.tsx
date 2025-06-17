import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { Text, View, Button } from "react-native";


import RootNavigator from "./navigation/RootNavigator";
//import { InventoryProvider } from "./context/InventoryContext";
import { PaperProvider } from "react-native-paper";
import { AuthProvider } from "./context/AuthContext";
import InventoryProviderSelector from "./context/InventoryProviderSelector";


export default function App() {
    // const { user } = 

    return (



        <PaperProvider>


            {/* <InventoryProvider> */}
            <AuthProvider>
                <InventoryProviderSelector>
                    <NavigationContainer>
                        <RootNavigator />
                    </NavigationContainer>
                </InventoryProviderSelector>

            </AuthProvider>

            {/* </InventoryProvider> */}
        </PaperProvider>
    );
}
