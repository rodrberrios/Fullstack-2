import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "../components/pages/Register";
import PerfilAdmin from "../components/pages/PerfilAdmin";
import PerfilCliente from "../components/pages/PerfilCliente";

const RouterConfig = () => (
    <Router>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/perfil-admin" component={PerfilAdmin} />
                <Route path="/perfil-cliente" component={PerfilCliente} />
            </Switch>
    </Router>
);

export default RouterConfig;

