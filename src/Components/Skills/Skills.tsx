import "./Skills.css";

const skillGroups = [
    {
        title: "Frontend",
        icon: "🎨",
        skills: [
            "HTML5",
            "CSS3",
            "JavaScript",
            "TypeScript",
            "React",
            "Vite",
            "Bootstrap"
        ]
    },
    {
        title: "Backend",
        icon: "⚙️",
        skills: [
            "Node.js",
            "Express",
            "Java",
            "Google Apps Script"
        ]
    },
    {
        title: "Bases de Datos",
        icon: "🗄️",
        skills: [
            "MySQL",
            "PostgreSQL",
            "Google Sheets"
        ]
    },
    {
        title: "Herramientas",
        icon: "🛠️",
        skills: [
            "Git",
            "GitHub",
            "Docker",
            "Cloudflare",
            "Linux"
        ]
    }
];

export function Skills() {

    return (

        <section
            id="skills"
            className="section"
        >

            <h2 className="section-title">
                Tecnologías
            </h2>

            <p className="section-description">
                Estas son algunas de las tecnologías y herramientas con las que
                trabajo habitualmente para desarrollar aplicaciones, automatizar
                procesos y construir soluciones escalables.
            </p>

            <div className="skills__grid">

                {
                    skillGroups.map(group => (

                        <article
                            key={group.title}
                            className="skill-card"
                        >

                            <div className="skill-card__header">

                                <span className="skill-card__icon">
                                    {group.icon}
                                </span>

                                <h3>
                                    {group.title}
                                </h3>

                            </div>

                            <ul>

                                {
                                    group.skills.map(skill => (

                                        <li key={skill}>
                                            {skill}
                                        </li>

                                    ))
                                }

                            </ul>

                        </article>

                    ))
                }

            </div>

        </section>

    );

}