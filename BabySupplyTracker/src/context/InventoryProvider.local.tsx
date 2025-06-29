import AsyncStorage from '@react-native-async-storage/async-storage'
import React, { createContext, useContext, useEffect, useState } from 'react';
import { InventoryItem } from '../navigation/types';
import InventoryContext from './InventoryContext';


const STORAGE_KEY = 'LOCAL_INVENTORY';

export const InventoryProviderLocal = ({ children }: { children: React.ReactNode }) => {

    const [items, setItems] = useState<InventoryItem[]>([]);

    type Category = {
        label: string;
        value: string;
        icon: string;
    }

    type Unit = {
        id: string;
        label: string;

    }

    const [categoryList, setCategoryList] = useState<Category[]>([
        { label: "Hygiene Product", value: "Hygiene Product", icon: "human-baby-changing-table" },
        { label: "Feeding Product", value: "Feeding Product", icon: "food-apple" },
        { label: "Clothing", value: "Clothing", icon: "tshirt-crew" },
        { label: "Shower Product", value: "Shower Product", icon: "bathtub" },
        { label: "Baby Gear", value: "Baby Gear", icon: "baby-carriage" },
        { label: "Toys", value: "Toys", icon: "dice-5" },
        { label: "Medicine Product", value: "Medicine Product", icon: "pill" },
        { label: "Sleeping Product", value: "Sleeping Product", icon: "bed" },
    ]);

    const [unitList, setUnitList] = useState<Unit[]>([
        { id: "each", label: "Each" },
        { id: "box", label: "Box" },
        { id: "pack", label: "Pack" },
        { id: "bottle", label: "Bottle" },
        { id: "can", label: "Can" },
        { id: "jar", label: "Jar" },
        { id: "pouch", label: "Pouch" },
        { id: "set", label: "Set" },
        { id: "tube", label: "Tube" },
        { id: "pair", label: "Pair" },
        { id: "bag", label: "Bag" },
        { id: "case", label: "Case" },
        { id: "roll", label: "Roll" },
    ]);



    useEffect(() => {
        const loadItems = async () => {
            try {
                const storedItems = await AsyncStorage.getItem(STORAGE_KEY);
                if (storedItems) {
                    setItems(JSON.parse(storedItems));
                }
            } catch (err) {
                console.error('Failed to load items', err);
            }
        };
        loadItems();
    }, []);

    useEffect(() => {

        //set item
        AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(items)).catch((err) => console.error("Failed to save items: ", err));

    }, [items]);

    //update item
    const updateItem = (updatedItem: InventoryItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    }
    //add item
    const addItem = (newItem: InventoryItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    }

    //delete item
    const deleteItem = (itemId: string) => {
        setItems((prevItems) => prevItems.filter((item) => item.id !== itemId));
    }

    return (
        <InventoryContext.Provider value={{ items, addItem, updateItem, deleteItem, unitList, categoryList, uid: null }}>
            {children}
        </InventoryContext.Provider>
    );

}







