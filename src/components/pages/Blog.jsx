import React from "react";
import Header from "../organisms/Header";
import Footer from "../organisms/Footer";
import style from "./Blog.module.css"


const Blog = () => {
    return (
        <div className={style.container}>
            <Header></Header>
            <main className={style.blogContainer}>
                <section className={style.section}></section>
                <section className={style.section}></section>
                <section className={style.section}></section>
            </main>
            <Footer></Footer>
        </div>
    );
}

export default Blog;