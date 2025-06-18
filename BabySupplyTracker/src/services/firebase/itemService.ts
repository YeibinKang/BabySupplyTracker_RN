import { db, auth } from './firebaseConfig';
import { collection, addDoc, getDoc, getDocs, updateDoc, deleteDoc, doc, query, where } from 'firebase/firestore';


//const uid = auth.currentUser?.uid;

//addItem
export const addItem = async (item) => {
    const itemRef = collection(db, 'items');
    const docRef = await addDoc(itemRef, {
        ...item,
        createdAt: new Date(),
        uid: auth.currentUser?.uid,
    });

    await updateDoc(docRef, {id:docRef.id});
    
};


//getItems
export const getItems = async (uid:string) => {
    const user = auth.currentUser;
    if(!user){
        throw new Error("User is not authenticated");       
    }

    const q = query(collection(db, 'items'), where('uid', '==', user.uid));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
    }));
};



//updateItem
export const updateItem = async (itemId, updatedData) => {
    const user = auth.currentUser;
    console.log("Current user: ", user.uid);

    

    const itemDocRef = doc(db, 'items', itemId);
    const itemSnap = await getDoc(itemDocRef);

    if(itemSnap.exists() && itemSnap.data().uid === user.uid){
        await updateDoc(itemDocRef, updatedData);
    }else{
        throw new Error("No authroization or No item exist");
    }
}

//deleteItem
export const deleteItem = async (itemId) => {
    const itemDocRef = doc(db, 'items', itemId);
    const itemSnap = await getDoc(itemDocRef);
    const user = auth.currentUser;


    if(itemSnap.exists() && itemSnap.data().uid === user?.uid){
        await deleteDoc(itemDocRef);
    }else{
        throw new Error("No authorization OR No item exist");
    }

    
}