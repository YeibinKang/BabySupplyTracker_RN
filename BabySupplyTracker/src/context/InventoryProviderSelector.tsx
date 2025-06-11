//user?
import { useAuth } from "./AuthContext";
import { InventoryProviderFirebase } from "./InventoryProvider.firebase";
import { InventoryProviderLocal } from "./InventoryProvider.local";

export default function InventoryProviderSelector({ children }) {
    const { user } = useAuth();

    if (user) {
        //firebase
        return <InventoryProviderFirebase uid={user.uid}>{children}</InventoryProviderFirebase>
    } else {
        return <InventoryProviderLocal></InventoryProviderLocal>
    }
}