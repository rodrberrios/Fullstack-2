import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import PerfilAdmin from "../components/pages/PerfilAdmin";
import PerfilCliente from "../components/pages/PerfilCliente";
import Nosotros from "../components/pages/Nosotros";
import Contacto from "../components/pages/Contacto";
import Carrito from "../components/pages/Carrito";
import Blog from "../components/pages/Blog"
import Catalogo from "../components/pages/Catalogo";
import Checkout from "../components/pages/Checkout";
import CompraExitosa from "../components/pages/CompraExitosa";
import ErrorPago from "../components/pages/ErrorPago";
import HistorialConsultas from "../components/pages/HistorialConsultas";
import HistorialCompras from "../components/pages/HistorialCompras";
import Customers from "../components/pages/Customers";
import Orders from "../components/pages/Orders";
import Inventory from "../components/pages/Inventory";
import Categories from "../components/pages/Categories";
import ProtectedRoute from "../components/ProtectedRoute";

const RouterConfig = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/perfilAdmin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <PerfilAdmin />
                </ProtectedRoute>
            } />
            <Route path="/perfilCliente" element={
                <ProtectedRoute allowedRoles={['cliente', 'vendedor']}>
                    <PerfilCliente />
                </ProtectedRoute>
            } />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/exito" element={<CompraExitosa />} />
            <Route path="/error" element={<ErrorPago />} />
            <Route path="/historialConsultas" element={
                <ProtectedRoute allowedRoles={['cliente', 'vendedor']}>
                    <HistorialConsultas />
                </ProtectedRoute>
            } />
            <Route path="/historialCompras" element={
                <ProtectedRoute allowedRoles={['cliente', 'vendedor']}>
                    <HistorialCompras />
                </ProtectedRoute>
            } />
            <Route path="/customers" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <Customers />
                </ProtectedRoute>
            } />
            <Route path="/orders" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <Orders />
                </ProtectedRoute>
            } />
            <Route path="/inventory" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <Inventory />
                </ProtectedRoute>
            } />
            <Route path="/categories" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <Categories />
                </ProtectedRoute>
            } />
        </Routes>
    </Router>
);

export default RouterConfig;