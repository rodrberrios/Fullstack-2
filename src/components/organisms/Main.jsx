import React from "react";
import Section from "../molecules/Section";
import { Link } from 'react-router-dom';

const Main = () => {
    return (
        <div>
        <Section>
            <Link to="/Iniciar">Iniciar Sesion</Link>
            <Link to="/Register">Registrarse</Link>
        </Section>

        <Section>
            <div>
                <h1>Level Up Gamer</h1>
            </div>
        </Section>
        
        {/* // <section className="main__section">
        // <div>
        //     <h1 className="main__title">LEVEL UP GAMER</h1>
        //     <p>Tu tienda de videojuegos favorita</p>
        // </div>
        //   <img className="main__img" src="./assets/img/icon.png" alt="Level UP Gamer" />
        // </section>

        // <section className="productos__section">
        //   <div>Descubre nuestros productos exclusivos</div>
        // </section> */}

        </div>

    );
}

export default Main;