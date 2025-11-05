import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Register from "../components/pages/Register";
import Login from "../components/pages/Login";
import PerfilAdmin from "../components/pages/Admin/PerfilAdmin";
import PerfilCliente from "../components/pages/PerfilCliente";
import Nosotros from "../components/pages/Nosotros";
import Contacto from "../components/pages/Contacto";
import Carrito from "../components/pages/Carrito";
import Blog from "../components/pages/Blog"
import Catalogo from "../components/pages/Catalogo";
import Checkout from "../components/pages/Checkout";
import CompraExitosa from "../components/pages/CompraExitosa";
import ErrorPago from "../components/pages/ErrorPago";
import Dashboard from "../components/pages/Admin/Dashboard";
import Inventory from "../components/pages/Admin/Inventory";
import Orders from "../components/pages/Admin/Orders";
import Reports from "../components/pages/Admin/Reports";
import Employees from "../components/pages/Admin/Employees";
import Customers from "../components/pages/Admin/Customers";
import Settings from "../components/pages/Admin/Settings";
import Profile from "../components/pages/Admin/Profile";
import Works from "../components/pages/Admin/Works";
import Search from "../components/pages/Admin/Search";
import Help from "../components/pages/Admin/Help";
import Details from "../components/pages/Admin/Details";
import HistorialConsultas from "../components/pages/HistorialConsultas";
import HistorialCompras from "../components/pages/HistorialCompras";
import Perfil from "../components/pages/Perfil";

const RouterConfig = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/admin" element={<PerfilAdmin />} />
            <Route path="/cliente" element={<PerfilCliente />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/catalogo" element={<Catalogo />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/exito" element={<CompraExitosa />} />
            <Route path="/error" element={<ErrorPago />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/employees" element={<Employees />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/works" element={<Works />} />
            <Route path="/search" element={<Search />} />
            <Route path="/help" element={<Help />} />
            <Route path="/details" element={<Details />} />
            <Route path="/historialConsultas" element={<HistorialConsultas />} />
            <Route path="/historialCompras" element={<HistorialCompras />} />
            <Route path="/perfil" element={<Perfil />} />
        </Routes>
    </Router>
);

export default RouterConfig;