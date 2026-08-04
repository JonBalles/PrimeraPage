import "./Contact.css";

export function Contact() {
    return (
        <section
            id="contact"
            className="section"
        >

            <h2 className="section-title">
                Hablemos
            </h2>

            <p className="section-description">
                Siempre estoy abierto a nuevos proyectos, colaboraciones,
                automatizaciones o simplemente una buena charla sobre tecnología.
            </p>

            <div className="contact__grid">

                <a
                    className="contact-card"
                    href="mailto:jonatan.a.ballestero@gmail.com"
                >
                    <span className="contact-card__icon">📧</span>

                    <h3>Email</h3>

                    <p>jonatan.a.ballestero@gmail.com</p>
                </a>

                <a
                    className="contact-card"
                    href="https://github.com/jonballes"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="contact-card__icon">💻</span>

                    <h3>GitHub</h3>

                    <p>Ver repositorios</p>
                </a>

                <a
                    className="contact-card"
                    href="https://www.linkedin.com/in/jonballes/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="contact-card__icon">💼</span>

                    <h3>LinkedIn</h3>

                    <p>Perfil profesional</p>
                </a>

                <a
                    className="contact-card"
                    href="https://www.instagram.com/jonatanballestero/"
                    target="_blank"
                    rel="noreferrer"
                >
                    <span className="contact-card__icon">📸</span>

                    <h3>Instagram</h3>

                    <p>@jonatanballestero</p>
                </a>

            </div>

        </section>
    );
}