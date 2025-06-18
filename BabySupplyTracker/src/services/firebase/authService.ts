import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from './firebaseConfig';

// export const signUp = async(email:string, password:string) => {
//     return await createUserWithEmailAndPassword(auth, email, password);
// };


export const signUp = async(email:string, password:string, displayName?:string) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    if (displayName) {
        await updateProfile(userCredential.user, { displayName });
    }
    return userCredential;
};

export const login = async(email:string, password:string)=>{
    return await signInWithEmailAndPassword(auth, email, password);
};
