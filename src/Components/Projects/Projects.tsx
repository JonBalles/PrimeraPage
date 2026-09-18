import { Link } from "react-router-dom";
import "./Projects.css";

export function Projects() {
    return (
        <section id="projects" className="section">
            <h2 className="section-title">Proyectos</h2>

            <p className="section-description">
                Un registro de lo que estoy construyendo, no una vitrina de tarjetas.
            </p>

            <div className="project-log">
                <div className="project-log__row">
                    <span className="project-log__status">[activo]</span>
                    <div className="project-log__body">
                        <span className="project-log__name">juegos</span>
                        <p className="project-log__desc">
                            Ahorcado y Cadáver Exquisito multijugador, en migración de
                            Google Apps Script a Supabase.
                        </p>
                    </div>
                    <Link to="/juegos" className="project-log__link">
                        jonfix.com.ar/juegos
                    </Link>
                </div>
            </div>
        </section>
    );
}
