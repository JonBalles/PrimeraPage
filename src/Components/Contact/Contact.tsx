import "./Contact.css";

export function Contact() {
    return (
        <section id="contact" className="section">
            <h2 className="section-title">Hablemos</h2>

            <p className="section-description">
                Siempre estoy abierto a nuevos proyectos, colaboraciones,
                automatizaciones o simplemente una buena charla sobre tecnología.
            </p>

            <div className="contact__grid">
                <a className="contact-card" href="mailto:jonatan.a.ballestero@gmail.com">
                    <span className="contact-card__label">email</span>
                    <span className="contact-card__value">jonatan.a.ballestero@gmail.com</span>
                </a>

                <a className="contact-card" href="https://github.com/jonballes" target="_blank" rel="noreferrer">
                    <span className="contact-card__label">github</span>
                    <span className="contact-card__value">ver repositorios</span>
                </a>

                <a className="contact-card" href="https://www.linkedin.com/in/jonballes/" target="_blank" rel="noreferrer">
                    <span className="contact-card__label">linkedin</span>
                    <span className="contact-card__value">perfil profesional</span>
                </a>

                <a className="contact-card" href="https://www.instagram.com/jonatanballestero/" target="_blank" rel="noreferrer">
                    <span className="contact-card__label">instagram</span>
                    <span className="contact-card__value">@jonatanballestero</span>
                </a>
            </div>
        </section>
    );
}
