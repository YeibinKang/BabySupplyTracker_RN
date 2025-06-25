import { db } from "./firebaseConfig";
import {collection, addDoc, getDocs, query, orderBy} from "firebase/firestore";

 const categories = [
     { label: "Hygiene Product", value: "Hygiene Product", icon: "human-baby-changing-table", order: 1 },
        { label: "Feeding Product", value: "Feeding Product", icon: "food-apple", order: 2 },
        { label: "Clothing", value: "Clothing", icon: "tshirt-crew", order: 3 },
        { label: "Shower Product", value: "Shower Product", icon: "bathtub", order: 4 },
        { label: "Baby Gear", value: "Baby Gear", icon: "baby-carriage", order: 5 },
        { label: "Toys", value: "Toys", icon: "dice-5", order: 6 },
        { label: "Medicine Product", value: "Medicine Product", icon: "pill", order: 7 },
        { label: "Sleeping Product", value: "Sleeping Product", icon: "bed", order: 8 },
        { label: "Other", value: "Other", icon: "dots-horizontal-circle-outline", order: 99 },
    ];


export const seedCategoriesIfEmpty = async () => {
    const snapshot = await getDocs(collection(db, 'categories'));
    const existingCategories = snapshot.docs.map(doc => doc.data().value); 
    const categoryCollection = collection(db, 'categories');

    let addedCount = 0;

    for (const category of categories) {
        if (!existingCategories.includes(category.value)) {
            await addDoc(categoryCollection, category);
            addedCount++;
        }
    }

    if (addedCount > 0) {
        console.log(`${addedCount} new categories added`);
    } else {
        console.log("All categories already exist");
    }
};

export const getCategories = async () => {
    const categoryRef = collection(db, 'categories');
    const q = query(categoryRef, orderBy('order'));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data(),
    }));
};
