import { db } from "../config/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

export const verificarCredenciales = async (correo, clave) => {
  try {
    // Buscar usuario en Firestore por correo y clave
    const q = query(
      collection(db, "usuarios"),
      where("correo", "==", correo),
      where("clave", "==", clave)
    );
    
    const querySnapshot = await getDocs(q);
    
    if (querySnapshot.empty) {
      throw new Error("Credenciales incorrectas");
    }
    
    // Retornar datos del usuario
    const userDoc = querySnapshot.docs[0];
    return {
      id: userDoc.id,
      ...userDoc.data()
    };
    
  } catch (error) {
    console.error('Error al verificar credenciales: ', error);
    throw error;
  }
};