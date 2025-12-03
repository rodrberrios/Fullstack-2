import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';

/**
 * Componente de protección de rutas basado en roles
 * Redirige si el usuario no tiene el rol adecuado
 */
const ProtectedRoute = ({ children, allowedRoles }) => {
    const { user } = useContext(UserContext);

    // Si no hay usuario, redirigir al login
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    // Si hay roles permitidos y el usuario no tiene uno de ellos, redirigir
    if (allowedRoles && !allowedRoles.includes(user.rol)) {
        // Redirigir según el rol del usuario
        const redirectPath = user.rol === 'admin' ? '/perfilAdmin' : '/perfilCliente';
        return <Navigate to={redirectPath} replace />;
    }

    // Si todo está bien, renderizar el componente hijo
    return children;
};

export default ProtectedRoute;
