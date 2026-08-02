import "./Header.css";

export function Header() {
    return (
        <header className="header">

            <div className="header__logo">
                Jon<span>Fix</span>
            </div>

            <nav className="header__nav">

                <a href="#about">Sobre mí</a>

                <a href="#skills">Tecnologías</a>

                <a href="#projects">Proyectos</a>

                <a href="#contact">Contacto</a>

            </nav>

        </header>
    );
}