import { Link } from "react-router-dom";
import "./About.css";

export function About() {
    return (
        <section id="about" className="section about">
            <h2 className="section-title">Sobre mí</h2>

            <div className="about__content">
                <div className="about__text">
                    <p>
                        Soy <strong>Jonatan Ballestero</strong>, desarrollador
                        Full Stack y técnico de soporte IT de Buenos Aires,
                        Argentina.
                    </p>

                    <p>
                        Disfruto resolver problemas mediante software, crear
                        herramientas que automaticen tareas y desarrollar
                        aplicaciones web con una buena experiencia de usuario.
                    </p>

                    <p>
                        Actualmente trabajo con tecnologías como React,
                        TypeScript, Node.js y Google Apps Script, además de
                        mantener infraestructura informática y brindar soporte
                        técnico.
                    </p>

                    <p>
                        También soy creador y administrador de{" "}
                        <Link to="/eden" className="about__eden-link">El Edén</Link>,
                        una comunidad donde organizo encuentros, actividades y
                        proyectos para conectar personas.
                    </p>
                </div>

                <div className="about__info">
                    <div className="info-row">
                        <span className="info-row__key">ubicación</span>
                        <span className="info-row__val">Buenos Aires, Argentina</span>
                    </div>
                    <div className="info-row">
                        <span className="info-row__key">profesión</span>
                        <span className="info-row__val">Full Stack Developer</span>
                    </div>
                    <div className="info-row">
                        <span className="info-row__key">especialidad</span>
                        <span className="info-row__val">Automatización & apps web</span>
                    </div>
                    <div className="info-row">
                        <span className="info-row__key">objetivo</span>
                        <span className="info-row__val">Crear soluciones útiles e innovadoras</span>
                    </div>
                </div>
            </div>
        </section>
    );
}
