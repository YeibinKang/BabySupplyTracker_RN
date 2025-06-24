import React, { useEffect, useState } from 'react';
import InventoryContext from './InventoryContext';
import { getCategories, seedCategoriesIfEmpty } from "../services/firebase/categoryService";
import { getUnits, seedUnitsIfEmpty } from "../services/firebase/unitService";
import { getItems, addItem as addItemToDB, updateItem as updateItemInDB, deleteItem as deleteItemFromDB } from "../services/firebase/itemService";

export const InventoryProviderFirebase = ({ children, uid }) => {
    const [items, setItems] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [unitList, setUnitList] = useState([]);
    const [itemsError, setItemsError] = useState(null);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {

                console.log("FetchInitialData START!!!!");
                console.log("User ID: ", uid);

                //initial datas (categories, units)

                await Promise.all([
                    seedCategoriesIfEmpty(),
                    seedUnitsIfEmpty(),
                ]);

                const [fetchedItems, fetchedCategories, fetchedUnits] = await Promise.all([
                    getItems(uid),
                    getCategories(),
                    getUnits()
                ]);

                console.log("Loading SUCCESS");

                setItems(fetchedItems);

                setCategoryList(fetchedCategories);

                setUnitList(fetchedUnits);

                setItemsError(null); // Reset error state on successful fetch
            } catch (err) {
                console.error("Error while initial Data loading: ", err);
                setItemsError(err);
            }


        };
        fetchInitialData();

    }, [uid]);


    //add Item
    const addItem = async (newItem) => {
        await addItemToDB(newItem);
        const updated = await getItems();
        setItems(updated);
    }

    //update Item
    const updateItem = async (updatedItem) => {
        console.log('updated id: ' + updatedItem.id);
        await updateItemInDB(updatedItem.id, updatedItem);
        const updated = await getItems();
        setItems(updated);
    }

    //delete Item
    const deleteItem = async (id) => {
        await deleteItemFromDB(id);
        const updated = await getItems();
        setItems(updated);
    }

    return (
        <InventoryContext.Provider
            value={{
                items,
                itemsError,
                categoryList,
                unitList,
                addItem,
                updateItem,
                deleteItem,
                uid,
            }}>
            {children}
        </InventoryContext.Provider>
    );

}