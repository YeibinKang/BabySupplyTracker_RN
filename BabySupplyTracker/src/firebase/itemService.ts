import { db } from './firebaseConfig';
import { collection, addDoc, getDocs, updateDoc, deleteDoc, doc } from 'firebase/firestore';

//addItem
export const addItem = async (item) => {
    const itemRef = collection(db, 'items');
    const docRef = await addDoc(itemRef, {
        ...item,
        createdAt: new Date(),
    });

    await updateDoc(docRef, {id:docRef.id});
    
};


//getItems
export const getItems = async () => {
    const snapshot = await getDocs(collection(db, 'items'));
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};



//updateItem
export const updateItem = async (itemId, updatedData) => {
    const itemDocRef = doc(db, 'items', itemId);
    await updateDoc(itemDocRef, updatedData);
}

//deleteItem
export const deleteItem = async (itemId) => {
    const itemDocRef = doc(db, 'items', itemId);
    await deleteDoc(itemDocRef);
}