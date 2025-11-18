import { createContext, useState } from "react";

// Contexto para manejar el estado del usuario (si esta logeado)
export const UserContext = createContext();

// Proveedor del contexto
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Usamos UserContext.Provider para proveer el estado y la funcion para actualizarlo a los componentes hijos
  return (
    <UserContext.Provider value = {{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};