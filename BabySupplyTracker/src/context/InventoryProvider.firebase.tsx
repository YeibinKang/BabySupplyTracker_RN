import React, { useEffect, useState } from 'react';
import InventoryContext from './InventoryContext';
import { getCategories, seedCategoriesIfEmpty } from "../services/firebase/categoryService";
import { getUnits, seedUnitsIfEmpty } from "../services/firebase/unitService";
import { getItems, addItem as addItemToDB, updateItem as updateItemInDB, deleteItem as deleteItemFromDB } from "../services/firebase/itemService";

export const InventoryProviderFirebase = ({ children, uid }) => {
    const [items, setItems] = useState([]);
    const [categoryList, setCategoryList] = useState([]);
    const [unitList, setUnitList] = useState([]);

    useEffect(() => {
        const fetchInitialData = async () => {
            try {

                console.log("FetchInitialData START!!!!");


                //initial datas (categories, units)

                await Promise.all([
                    seedCategoriesIfEmpty(),
                    seedUnitsIfEmpty(),
                ]);

                const [fetchedItems, fetchedCategories, fetchedUnits] = await Promise.all([
                    getItems(),
                    getCategories(),
                    getUnits()
                ]);

                console.log("Loading SUCCESS");

                setItems(fetchedItems);

                setCategoryList(fetchedCategories);

                setUnitList(fetchedUnits);
            } catch (err) {
                console.error("Error while initial Data loading: ", err);
            }


        };
        fetchInitialData();

    }, []);


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
                categoryList,
                unitList,
                addItem,
                updateItem,
                deleteItem
            }}>
            {children}
        </InventoryContext.Provider>
    );

}