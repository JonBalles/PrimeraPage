import "./About.css";

export function About() {
    return (
        <section id="about" className="section about">

            <h2 className="section-title">
                Sobre mí
            </h2>

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
                        También soy creador y administrador de <strong>El Edén</strong>,
                        una comunidad donde organizo encuentros, actividades y
                        proyectos para conectar personas.
                    </p>

                </div>

                <div className="about__info">

                    <div className="info-card">
                        <span>📍</span>
                        <div>
                            <h3>Ubicación</h3>
                            <p>Buenos Aires, Argentina</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <span>💼</span>
                        <div>
                            <h3>Profesión</h3>
                            <p>Full Stack Developer</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <span>💻</span>
                        <div>
                            <h3>Especialidad</h3>
                            <p>Automatización & Apps Web</p>
                        </div>
                    </div>

                    <div className="info-card">
                        <span>🎯</span>
                        <div>
                            <h3>Objetivo</h3>
                            <p>Crear soluciones útiles e innovadoras.</p>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    );
}