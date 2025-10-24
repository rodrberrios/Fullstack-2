import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import Card from "../atoms/Card/Card"

const Home = () => {
  return (
    <div className="container">

      <Header></Header>

      <main>

        <section>
          <h2>Level Up Gamer</h2>
          <p></p>
          <img src="" alt="" />
        </section>

        <section>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
          <Card></Card>
        </section>
      </main>

      <Footer></Footer>
    </div>
  );
};

export default Home;