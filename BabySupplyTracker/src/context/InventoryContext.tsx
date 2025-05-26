import React, { createContext, ReactNode, useContext, useState } from "react";

const InventoryContext = createContext({
    items: [],
    updateItem: (updatedItem: any) => { },
});

export const useInventory = () => useContext(InventoryContext);

type Category = {
    label: string;
    value: string;
    icon: string;
}

export const InventoryProvider = ({ children }: { children: ReactNode }) => {
    const [items, setItems] = useState([
        { id: 1, name: "Kirkland diaper", hasStage: true, stage: "2", qty: 3, minStock: 1, unit: "box", category: "Hygiene Product", hasExpiredDate: false, expiredDate: null, needsRestock: false, createdAt: "2026-10-20", itemLocation: "Storage", memo: "baby doesn't like it", },
        { id: 2, name: "Apple sauce", hasStage: false, stage: null, qty: 5, minStock: 1, unit: "pack", category: "Feeding Product", hasExpiredDate: true, expiredDate: "2025-11-10", needsRestock: false, createdAt: "2026-05-10", itemLocation: "Fridge", memo: "baby loves it" },
        { id: 3, name: "Sleeping sack", hasStage: true, stage: "3-6m", qty: 2, minStock: 1, unit: "each", category: "Clothing", hasExpiredDate: false, expiredDate: null, needsRestock: false, createdAt: "2026-05-12", itemLocation: "Drawer", memo: "too small" },
        { id: 4, name: "Baby wipes", hasStage: false, stage: null, qty: 10, minStock: 1, unit: "pack", category: "Hygiene Product", hasExpiredDate: true, expiredDate: "2026-12-01", needsRestock: false, createdAt: "2025-05-10", itemLocation: "Storage", memo: "no scent. good" },
        { id: 5, name: "Baby shampoo", hasStage: true, stage: "baby", qty: 1, minStock: 1, unit: "bottle", category: "Shower Product", hasExpiredDate: true, expiredDate: "2026-11-01", needsRestock: false, createdAt: "2025-05-10", itemLocation: "Bathroom", memo: "smells good" },
    ]);

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

    const [unitList, setUnitList] = useState<string[]>([
        "each",
        "box",
        "pack",
        "bottle",
        "can",
        "jar",
        "pouch",
        "set",
        "tube",
        "pair",
        "bag",
        "case",
        "roll",
        "tube",
    ]);

    //update item
    const updateItem = (updatedItem) => {
        setItems((prevItems) =>
            prevItems.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
    }
    //add item
    const addItem = (newItem) => {
        setItems((prevItems) => [...prevItems, newItem]);
    }

    //delete item

    //todo: add category?

    return (
        <InventoryContext.Provider value={{ items, updateItem, addItem, categoryList, unitList }}>
            {children}
        </InventoryContext.Provider>
    )


}