import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
    return (
        <header className="header">
            <div className="header__logo">
                jon<span>fix</span>
            </div>

            <nav className="header__nav">
                <a href="#about">sobre mí</a>
                <a href="#skills">tecnologías</a>
                <a href="#projects">proyectos</a>
                <a href="#contact">contacto</a>
                <Link to="/eden" className="header__nav-eden">el edén</Link>
            </nav>
        </header>
    );
}
