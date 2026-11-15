import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import "@fortawesome/fontawesome-free/css/all.min.css";
import Main from "./project components/main page";
import Half1 from "./project components/halfonepage";
import Projects from "./project components/projects";
import Touch from "./project components/touch";
import Footer from "./project components/Footer";
import SmoothScroll from "./SmoothScroll";
import Reveal from "./project components/Reveal";
import ScrollProgress from "./project components/ScrollProgress";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
    <React.StrictMode>
        <SmoothScroll>
            <ScrollProgress />
            <section className="w-full max-w-full"  >  <App /></section>
            <section id="home" className="w-full max-w-full" > <Reveal><Main /></Reveal></section>
            <section id="half1" className="w-full max-w-full"> <Reveal><Half1 /></Reveal></section>
            <section id="projects" className="w-full max-w-full"> <Reveal><Projects /></Reveal></section>
            <section id="touch" className="w-full max-w-full"> <Reveal><Touch /></Reveal></section>
            <section id="Footer" className="w-full max-w-full"> <Reveal><Footer /></Reveal></section>

        </SmoothScroll>


    </React.StrictMode >
);