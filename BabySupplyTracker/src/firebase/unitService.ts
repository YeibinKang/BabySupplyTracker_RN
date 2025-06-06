import { db } from "./firebaseConfig";
import {collection, addDoc, getDocs} from 'firebase/firestore';

const units = [
    "each", "box", "pack", "bottle", "can", "jar",
    "pouch", "set", "tube", "pair", "bag", "case", "roll"
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
