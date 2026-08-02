import "./Presentation.css";

export function Presentation() {
    return (
        <section className="presentation">

            <div className="presentation__avatar">
                <span>JB</span>
            </div>

            <p className="presentation__welcome">
                Hola, soy
            </p>

            <h1 className="presentation__title">
                Jonatan Ballestero
            </h1>

            <h2 className="presentation__subtitle">
                Full Stack Developer · Google Apps Script · IT Support
            </h2>

            <p className="presentation__description">
                Desarrollo aplicaciones web, automatizaciones y herramientas que
                resuelven problemas reales. Me apasiona construir software útil,
                aprender nuevas tecnologías y crear experiencias simples,
                modernas y eficientes.
            </p>

            <div className="presentation__buttons">

                <a
                    href="#projects"
                    className="button button--primary"
                >
                    Ver proyectos
                </a>

                <a
                    href="#contact"
                    className="button button--secondary"
                >
                    Contactarme
                </a>

            </div>

        </section>
    );
}