import { db } from "../config/firebase";
import { collection, getDocs } from "firebase/firestore";

export const obtenerProductos = async () => {
  try {
    const snapshot = await getDocs(collection(db, "producto"));
    const productos = snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    console.log("Productos cargados desde Firestore:", productos.length);
    return productos;
  } catch (error) {
    console.error("Error al cargar productos:", error);
    throw error;
  }
};