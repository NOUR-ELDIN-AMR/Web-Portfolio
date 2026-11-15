import * as Tabs from "@radix-ui/react-tabs";
import "../projects.css";

// ✏️ Edit your projects here. Each one becomes a card.
// image  = which picture to show (IMAGE = p4.jpg, IMAGE1 = p5.jpg, IMAGE2 = p6.png, see projects.css)
// live / github = put your links between the quotes. Empty = the button is hidden.
const PROJECTS = [
    {
        title: "TripNest - Travel Booking",
        description:
            "A travel booking platform featuring curated destination packages, adventure articles, discount deals, and a full newsletter subscription system.",
        tags: ["HTML", "CSS", "UX Design"],
        category: "web",
        image: "IMAGE",
        live: "",
        github: "",
    },
    {
        title: "LinguaLearn - Language Platform",
        description:
            "An interactive language-learning SaaS platform with expert tutors, personalized learning paths, pricing tiers, and a global community of learners.",
        tags: ["HTML", "CSS", "UX Design"],
        category: "web",
        image: "IMAGE1",
        live: "",
        github: "",
    },
    {
        title: "Personal Portfolio",
        description:
            "This portfolio website: a responsive, animated React site with a gradient theme, smooth scrolling and reusable components.",
        tags: ["React", "Tailwind CSS", "Motion"],
        category: "portfolio",
        image: "IMAGE2",
        live: "",
        github: "",
    },

    // 💡 Add a full-stack project here when you have one, for example:
    // {
    //     title: "Task Manager API",
    //     description: "A MERN app with authentication, CRUD REST API and a React dashboard.",
    //     tags: ["React", "Node.js", "Express", "MongoDB"],
    //     category: "fullstack",
    //     image: "IMAGE",
    //     live: "",
    //     github: "",
    // },
    // ...then add { value: "fullstack", label: "Full-Stack" } to TABS below.
];

const TABS = [
    { value: "all", label: "All Projects" },
    { value: "web", label: "Web Apps" },
    { value: "portfolio", label: "Portfolio" },
];

function ProjectCard({ project }) {
    return (
        <article className="main flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-all duration-300">

            {/* Picture */}
            <div className={`relative h-48 w-full bg-cover bg-center sm:h-52 ${project.image}`}>
                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg)]/80 px-3 py-1 text-xs font-medium text-gray-200">
                    <span className="h-2 w-2 rounded-full bg-green-400"></span>
                    Completed
                </span>
            </div>

            {/* Text */}
            <div className="flex flex-1 flex-col p-5 sm:p-6">
                <h3 className="text-lg font-semibold text-white sm:text-xl">{project.title}</h3>

                <p className="mt-3 text-sm leading-relaxed text-gray-400">{project.description}</p>

                <div className="mt-5 flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                        <span
                            key={tag}
                            className="rounded-full border border-[color:var(--accent-50)] px-3 py-1 text-xs text-[color:var(--accent)]"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                {(project.live || project.github) && (
                    <div className="mt-6 flex flex-wrap gap-3 pt-2">
                        {project.live && (
                            <a
                                href={project.live}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)] px-5 py-2 text-sm font-semibold text-white transition hover:scale-105"
                            >
                                Live Demo
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="rounded-full border border-[color:var(--border)] px-5 py-2 text-sm font-semibold text-gray-200 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                            >
                                Code
                            </a>
                        )}
                    </div>
                )}
            </div>
        </article>
    );
}

function Projects() {
    return (
        <section id="projects" className="bg-grad-2 w-full scroll-mt-24 overflow-hidden py-20 sm:py-28">

            {/* Header */}
            <div className="flex flex-col items-center px-6 text-center">
                <p className="text-sm uppercase tracking-[6px] text-[color:var(--accent)]">
                    My Work
                </p>

                <h2 className="mt-4 bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)] bg-clip-text text-3xl font-bold text-transparent sm:text-4xl">
                    Featured Projects
                </h2>

                <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)]"></div>

                <p className="mt-6 max-w-2xl text-sm text-gray-400">
                    Real-world applications built with modern technologies and best practices.
                </p>
            </div>

            {/* Tabs + cards */}
            <Tabs.Root defaultValue="all" className="mx-auto mt-10 max-w-7xl px-6 sm:mt-12">
                <Tabs.List className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2">
                    {TABS.map((tab) => (
                        <Tabs.Trigger
                            key={tab.value}
                            value={tab.value}
                            className="tabs-trigger cursor-pointer text-sm font-medium text-gray-300 transition hover:text-white"
                        >
                            {tab.label}
                        </Tabs.Trigger>
                    ))}
                </Tabs.List>

                {TABS.map((tab) => (
                    <Tabs.Content key={tab.value} value={tab.value} className="mt-10 sm:mt-12">
                        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                            {PROJECTS.filter((p) => tab.value === "all" || p.category === tab.value).map((project) => (
                                <ProjectCard key={project.title} project={project} />
                            ))}
                        </div>
                    </Tabs.Content>
                ))}
            </Tabs.Root>

        </section>
    );
}

export default Projects;