import { db } from "../config/firebase";
import { collection,addDoc, getDoc, query, where } from "firebase/firestore";

export async function addUser(user) {
    return await addDoc(collection(db, "usuario"), {...user, createdAt: new Date()});
}

export async function getProduct(params) {
    const snap = await getDoc(collection(db, "productos"));
    return snap.docs.map(d => ({id: d.id, ...d.data()}));   
}
