import "./F.css";

export function Footer() {
    return (
        <footer className="footer">
            <div className="footer__content">
                <div>
                    <h3>jonfix</h3>
                    <p>
                        Desarrollador Full Stack especializado en aplicaciones web,
                        automatización y soluciones con Google Apps Script.
                    </p>
                </div>

                <nav className="footer__links">
                    <a href="https://www.instagram.com/jonatanballestero/" target="_blank" rel="noopener noreferrer">
                        Instagram
                    </a>
                    <a href="https://github.com/jonballes" target="_blank" rel="noopener noreferrer">
                        GitHub
                    </a>
                    <a href="https://www.linkedin.com/in/jonballes/" target="_blank" rel="noopener noreferrer">
                        LinkedIn
                    </a>
                    <a href="mailto:jonatan.a.ballestero@gmail.com">
                        Email
                    </a>
                    <a href="/eden">
                        El Edén
                    </a>
                </nav>
            </div>

            <div className="footer__ai-note">
                Parte del código de este sitio fue escrito con ayuda de herramientas de IA.
            </div>

            <div className="footer__bottom">
                © {new Date().getFullYear()} Jonatan A. Ballestero · Desarrollado con React + TypeScript
            </div>
        </footer>
    );
}
