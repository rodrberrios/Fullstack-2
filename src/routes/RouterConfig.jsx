import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import PerfilAdmin from "../components/pages/PerfilAdmin";
import PerfilCliente from "../components/pages/PerfilCliente";
import Nosotros from "../components/pages/Nosotros";
import Contacto from "../components/pages/Contacto";
import Carrito from "../components/pages/Carrito";
import Blog from "../components/pages/Blog";
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
import Reports from "../components/pages/Reports";
import PerfilVendedor from "../components/pages/PerfilVendedor";
import VendedorProductos from "../components/pages/VendedorProductos";
import VendedorOrdenes from "../components/pages/VendedorOrdenes";
import DashboardVendedor from "../components/pages/DashboardVendedor";
import ProtectedRoute from "../components/ProtectedRoute";

const RouterConfig = () => (
    <Router>
        <Routes>
            {/* Rutas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/blog" element={<Blog />} />

            {/* Rutas de Admin */}
            <Route path="/perfilAdmin" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <PerfilAdmin />
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
            <Route path="/reports" element={
                <ProtectedRoute allowedRoles={['admin']}>
                    <Reports />
                </ProtectedRoute>
            } />

            {/* Rutas de Cliente (solo para clientes, NO vendedores) */}
            <Route path="/perfilCliente" element={
                <ProtectedRoute allowedRoles={['cliente']}>
                    <PerfilCliente />
                </ProtectedRoute>
            } />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/exito" element={<CompraExitosa />} />
            <Route path="/error" element={<ErrorPago />} />
            <Route path="/historialConsultas" element={
                <ProtectedRoute allowedRoles={['cliente']}>
                    <HistorialConsultas />
                </ProtectedRoute>
            } />
            <Route path="/historialCompras" element={
                <ProtectedRoute allowedRoles={['cliente']}>
                    <HistorialCompras />
                </ProtectedRoute>
            } />

            {/* Rutas de Vendedor */}
            <Route path="/vendedor/dashboard" element={
                <ProtectedRoute allowedRoles={['vendedor']}>
                    <DashboardVendedor />
                </ProtectedRoute>
            } />
            <Route path="/vendedor/perfil" element={
                <ProtectedRoute allowedRoles={['vendedor']}>
                    <PerfilVendedor />
                </ProtectedRoute>
            } />
            <Route path="/vendedor/productos" element={
                <ProtectedRoute allowedRoles={['vendedor']}>
                    <VendedorProductos />
                </ProtectedRoute>
            } />
            <Route path="/vendedor/ordenes" element={
                <ProtectedRoute allowedRoles={['vendedor']}>
                    <VendedorOrdenes />
                </ProtectedRoute>
            } />
        </Routes>
    </Router>
);

export default RouterConfig;