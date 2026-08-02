import "./F.css";

export function Footer() {

    return (

        <footer className="footer">

            <div className="footer__content">

                <div>

                    <h3>JonFix</h3>

                    <p>
                        Desarrollador Full Stack especializado en aplicaciones web,
                        automatización y soluciones con Google Apps Script.
                    </p>

                </div>

                <nav className="footer__links">

                    <a
                        href="https://www.instagram.com/jonatanballestero/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Instagram
                    </a>

                    <a
                        href="https://github.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        GitHub
                    </a>

                    <a
                        href="https://linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        LinkedIn
                    </a>

                    <a
                        href="https://chat.whatsapp.com/FheFi72VfmfL9i11Ig1ea8"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        Mi comunidad: El Edén 🍃
                    </a>

                </nav>

            </div>

            <div className="footer__bottom">

                © {new Date().getFullYear()} Jonatan A. Ballestero · Desarrollado con React + TypeScript

            </div>

        </footer>

    );

}