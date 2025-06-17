import { db } from "./firebaseConfig";
import {collection, addDoc, getDocs} from 'firebase/firestore';

const units = [
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
  ];

export const seedUnitsIfEmpty = async () => {
    
const snapshot = await getDocs(collection(db, 'units'));
  if (snapshot.empty) {
    const unitCollection = collection(db, 'units');
    for (const unit of units) {
      await addDoc(unitCollection, { name: unit });
    }
    console.log("Initial Unit data saved!");
  } else {
    console.log("Unit data is already exist");
  }

};

export const getUnits = async () => {
    const snapshot = await getDocs(collection(db, 'units'));
    return snapshot.docs.map(doc =>({
      id: doc.id,
      ...doc.data(),
    }));
    
    //return snapshot.docs.map(doc => doc.data().name);
};
