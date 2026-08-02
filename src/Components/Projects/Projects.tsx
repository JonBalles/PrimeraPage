import "./Projects.css";

type Project = {
    title: string;
    description: string;
    technologies: string[];
    status: "Finalizado" | "En desarrollo" | "Idea";
    demo?: string;
    github?: string;
};

const projects: Project[] = [
    {
        title: "Calendario de Cumpleaños",
        description:
            "Sistema desarrollado con Google Apps Script y Google Sheets para gestionar cumpleaños mediante formularios, panel administrativo y recordatorios.",

        technologies: [
            "Google Apps Script",
            "Google Sheets",
            "JavaScript"
        ],

        status: "Finalizado"
    },

    {
        title: "Juego del Ahorcado",
        description:
            "Juego multijugador donde varios participantes intentan descubrir la palabra secreta con turnos y temporizador.",

        technologies: [
            "HTML",
            "CSS",
            "JavaScript",
            "Google Apps Script"
        ],

        status: "En desarrollo"
    },

    {
        title: "Cadaver exquisito",
        description:
            "Aplicación donde varios jugadores escriben una historia por turnos con límite de tiempo.",

        technologies: [
            "React",
            "TypeScript",
            "Google Apps Script"
        ],

        status: "En desarrollo"
    },
];

export function Projects() {

    return (

        <section
            id="projects"
            className="section"
        >

            <h2 className="section-title">
                Proyectos
            </h2>

            <p className="section-description">
                Algunos de los proyectos en los que trabajé y sigo desarrollando.
            </p>

            <div className="projects-grid">

                {projects.map(project => (

                    <article
                        key={project.title}
                        className="project-card"
                    >

                        <span
                            className={`status status--${project.status.replace(/\s/g, "-").toLowerCase()}`}
                        >
                            {project.status}
                        </span>

                        <h3>
                            {project.title}
                        </h3>

                        <p>
                            {project.description}
                        </p>

                        <div className="project-tech">

                            {project.technologies.map(tech => (

                                <span key={tech}>
                                    {tech}
                                </span>

                            ))}

                        </div>

                        <div className="project-buttons">

                            {project.demo && (

                                <a
                                    href={project.demo}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Demo
                                </a>

                            )}

                            {project.github && (

                                <a
                                    href={project.github}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    Código
                                </a>

                            )}

                        </div>

                    </article>

                ))}

            </div>

        </section>

    );

}