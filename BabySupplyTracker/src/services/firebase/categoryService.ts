import { db } from "./firebaseConfig";
import {collection, addDoc, getDocs} from "firebase/firestore";

 const categories = [
        { label: "Hygiene Product", value: "Hygiene Product", icon: "human-baby-changing-table" },
    { label: "Feeding Product", value: "Feeding Product", icon: "food-apple" },
    { label: "Clothing", value: "Clothing", icon: "tshirt-crew" },
    { label: "Shower Product", value: "Shower Product", icon: "bathtub" },
    { label: "Baby Gear", value: "Baby Gear", icon: "baby-carriage" },
    { label: "Toys", value: "Toys", icon: "dice-5" },
    { label: "Medicine Product", value: "Medicine Product", icon: "pill" },
    { label: "Sleeping Product", value: "Sleeping Product", icon: "bed" },
    ];


export const seedCategoriesIfEmpty = async () => {

    const snapshot = await getDocs(collection(db, 'categories'));
    if(snapshot.empty){
        const categoryCollection = collection(db, 'categories');

    for(const category of categories){
        await addDoc(categoryCollection, category);
    }

    console.log("Success to create a categories collection");
    }else{
        console.log("Category data is already exist");
    }
   
    
};

export const getCategories = async () => {
    const snapshot = await getDocs(collection(db, 'categories'));
    return snapshot.docs.map(doc=>({
        id: doc.id,
        ...doc.data(),
    }));
};
