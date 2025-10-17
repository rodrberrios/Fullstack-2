import { db } from "../config/firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

export const createUser = async (userData) => {
    try {
        const docRef = await addDoc(collection(db, "usuarios"), {
            run: userData.run,
            nombre: userData.nombre,
            correo: userData.correo,
            clave: userData.clave,
            fechaNacimiento: userData.fecha,
            createdAt: new Date()
        });
        console.log('Usuario registrado con ID: ', docRef.id);
        return docRef.id;
    } catch (error) {
        console.error('Error al agregar usuario: ', error);
        throw error;
    }
};

export async function getProducts() {
    const querySnapshot = await getDocs(collection(db, "productos"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));   
}