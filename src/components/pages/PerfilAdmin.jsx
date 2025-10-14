import { useLocation } from "react-router-dom";

function useQuery() { return new URLSearchParams(useLocation().search());}

const PerfilAdmin = () => {
    const q = useQuery();
    return <h1>Bienvenido {q.get("nombre")}</h1>;
};

export default PerfilAdmin;