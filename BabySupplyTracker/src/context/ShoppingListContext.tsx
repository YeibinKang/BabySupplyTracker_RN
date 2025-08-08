import React, { createContext, useContext } from "react";
import { ShoppingListItem } from "../navigation/types";

const ShoppingListContext = createContext<ShoppingListContextType>({
    shoppingList: [],
    addShoppingListItem: () => { },
    updateShoppingListItem: () => { },
    deleteShoppingListItem: () => { },
    markAsPurchased: () => { },
});
type ShoppingListContextType = {
    shoppingList: ShoppingListItem[];
    addShoppingListItem: (item: ShoppingListItem) => void;
    updateShoppingListItem: (item: ShoppingListItem) => void;
    deleteShoppingListItem: (id: string) => void;
    markAsPurchased: (id: string) => void;
};

export const useShoppingList = () => {
    const context = useContext(ShoppingListContext);
    if (!context) throw new Error('useShoppingList must be used within ShoppingListProvider');
    return context;
};

export const ShoppingListProvider = ({ children }: { children: React.ReactNode }) => {
    const [shoppingList, setShoppingList] = React.useState<ShoppingListItem[]>([]);

    const addShoppingListItem = (item: ShoppingListItem) => {
        setShoppingList(prev => [...prev, item]);
    };

    const updateShoppingListItem = (updatedItem: ShoppingListItem) => {
        setShoppingList(prev => prev.map(i => i.id === updatedItem.id ? updatedItem : i));
    };

    const deleteShoppingListItem = (id: string) => {
        setShoppingList(prev => prev.filter(i => i.id !== id));
    };

    const markAsPurchased = (id: string) => {
        setShoppingList(prev => prev.map(i => i.id === id ? { ...i, isPurchased: true } : i));
    };

    return (
        <ShoppingListContext.Provider value={{ shoppingList, addShoppingListItem, updateShoppingListItem, deleteShoppingListItem, markAsPurchased }}>
            {children}
        </ShoppingListContext.Provider>
    );
}