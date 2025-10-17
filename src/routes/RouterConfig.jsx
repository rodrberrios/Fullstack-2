import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../components/pages/Home";
import Register from "../components/pages/Register";
import PerfilAdmin from "../components/pages/PerfilAdmin";
import PerfilCliente from "../components/pages/PerfilCliente";
import Nosotros from "../components/pages/Nosotros";
import Contacto from "../components/pages/Contacto";
import Carrito from "../components/pages/Carrito";
import Productos from "../components/pages/Productos";
import Blog from "../components/pages/Blog"
import IniciarSesion from "../components/pages/IniciarSesion";


const RouterConfig = () => (
    <Router>
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/admin" element={<PerfilAdmin />} />
            <Route path="/cliente" element={<PerfilCliente />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path="/contacto" element={<Contacto />} />
            <Route path="/carrito" element={<Carrito />} />
            <Route path="/productos" element={<Productos />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/Iniciar" element={<IniciarSesion />} />
        </Routes>
    </Router>
);

export default RouterConfig;