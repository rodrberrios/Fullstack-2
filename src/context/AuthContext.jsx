import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Inicializar usuario desde localStorage al cargar la app
  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (usuarioGuardado) {
      try {
        setUser(JSON.parse(usuarioGuardado));
      } catch (error) {
        console.error("Error al parsear usuario desde localStorage:", error);
        localStorage.removeItem("usuario");
      }
    }
  }, []);

  // Usamos UserContext.Provider para proveer el estado y la funcion para actualizarlo a los componentes hijos
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};