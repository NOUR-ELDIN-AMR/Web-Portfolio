import { useEffect, useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import "../projects.css";

/* ------------------------------------------------------------------ */
/*  Settings – edit these                                             */
/* ------------------------------------------------------------------ */

const GITHUB_USER = "NOUR-ELDIN-AMR";

// Repos you do NOT want on the website (use the exact repo names).
const HIDDEN = ["NOUR-ELDIN-AMR"]; // profile README repo, add more if needed

// Optional: customise how a specific repo looks on the site.
// Everything is optional – leave a field out to use what GitHub provides.
const OVERRIDES = {
    // "Web-Portfolio": {
    //     title: "Personal Portfolio",
    //     description: "My responsive, animated full-stack portfolio built with React and Tailwind CSS.",
    //     image: "https://your-image-url.png",
    //     live: "https://your-site.vercel.app",
    // },
};

const CACHE_KEY = `gh-repos-${GITHUB_USER}`;
const CACHE_MINUTES = 10; // avoids GitHub's rate limit (60 requests/hour)

/* ------------------------------------------------------------------ */
/*  Helpers                                                           */
/* ------------------------------------------------------------------ */

const prettify = (name) => name.replace(/[-_]+/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());

function readCache() {
    try {
        const raw = sessionStorage.getItem(CACHE_KEY);
        if (!raw) return null;
        const { time, data } = JSON.parse(raw);
        return Date.now() - time < CACHE_MINUTES * 60000 ? data : null;
    } catch {
        return null;
    }
}

function writeCache(data) {
    try {
        sessionStorage.setItem(CACHE_KEY, JSON.stringify({ time: Date.now(), data }));
    } catch {
        /* storage unavailable – ignore */
    }
}

// Turns a raw GitHub repo into what the cards need.
function toProject(repo) {
    const o = OVERRIDES[repo.name] || {};
    return {
        id: repo.id,
        title: o.title || prettify(repo.name),
        description: o.description || repo.description || "No description yet.",
        language: repo.language || "Other",
        tags: [repo.language, ...(repo.topics || [])].filter(Boolean).slice(0, 4),
        stars: repo.stargazers_count,
        image: o.image || `https://opengraph.githubassets.com/1/${repo.owner.login}/${repo.name}`,
        live: o.live || repo.homepage || "",
        github: repo.html_url,
    };
}

/* ------------------------------------------------------------------ */
/*  Data hook                                                         */
/* ------------------------------------------------------------------ */

function useGithubProjects() {
    const [state, setState] = useState({ loading: true, error: false, projects: [] });

    useEffect(() => {
        const cached = readCache();
        if (cached) {
            setState({ loading: false, error: false, projects: cached });
            return;
        }

        const controller = new AbortController();

        fetch(`https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated`, {
            signal: controller.signal,
        })
            .then((res) => {
                if (!res.ok) throw new Error(res.status);
                return res.json();
            })
            .then((repos) => {
                const projects = repos
                    .filter((r) => !r.fork && !r.archived && !HIDDEN.includes(r.name))
                    .map(toProject);
                writeCache(projects);
                setState({ loading: false, error: false, projects });
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setState({ loading: false, error: true, projects: [] });
                }
            });

        return () => controller.abort();
    }, []);

    return state;
}

/* ------------------------------------------------------------------ */
/*  Card                                                              */
/* ------------------------------------------------------------------ */

function ProjectCard({ project }) {
    const [imgFailed, setImgFailed] = useState(false);

    return (
        <article className="main flex flex-col overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] transition-all duration-300">

            {/* Picture (GitHub's auto-generated preview of the repo) */}
            <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-[color:var(--accent-40)] via-[color:var(--accent-2-40)] to-[color:var(--accent-3-40)] sm:h-52">
                {!imgFailed && (
                    <img
                        src={project.image}
                        alt={`${project.title} preview`}
                        loading="lazy"
                        onError={() => setImgFailed(true)}
                        className="h-full w-full object-cover"
                    />
                )}

                <span className="absolute left-4 top-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] bg-[color:var(--bg)]/80 px-3 py-1 text-xs font-medium text-gray-200">
                    <span className="h-2 w-2 rounded-full bg-[color:var(--accent)]"></span>
                    {project.language}
                </span>

                {project.stars > 0 && (
                    <span className="absolute right-4 top-4 inline-flex items-center gap-1 rounded-full border border-[color:var(--border)] bg-[color:var(--bg)]/80 px-3 py-1 text-xs font-medium text-gray-200">
                        <i className="fa-solid fa-star text-yellow-400"></i>
                        {project.stars}
                    </span>
                )}
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

                <div className="mt-auto flex flex-wrap gap-3 pt-6">
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
                    <a
                        href={project.github}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-5 py-2 text-sm font-semibold text-gray-200 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                    >
                        <i className="fa-brands fa-github"></i>
                        Code
                    </a>
                </div>
            </div>
        </article>
    );
}

function SkeletonCard() {
    return (
        <div className="animate-pulse overflow-hidden rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)]">
            <div className="h-48 bg-white/5 sm:h-52" />
            <div className="space-y-3 p-6">
                <div className="h-5 w-2/3 rounded bg-white/10" />
                <div className="h-3 w-full rounded bg-white/5" />
                <div className="h-3 w-5/6 rounded bg-white/5" />
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

function Projects() {
    const { loading, error, projects } = useGithubProjects();

    // Tabs: "All" + one per language found in your repos (most used first).
    const tabs = useMemo(() => {
        const counts = {};
        projects.forEach((p) => (counts[p.language] = (counts[p.language] || 0) + 1));
        const langs = Object.keys(counts).sort((a, b) => counts[b] - counts[a]);
        return [{ value: "all", label: "All Projects" }, ...langs.map((l) => ({ value: l, label: l }))];
    }, [projects]);

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
                    Real projects pulled live from my GitHub, so this list always stays up to date.
                </p>
            </div>

            <div className="mx-auto mt-10 max-w-7xl px-6 sm:mt-12">

                {/* Loading */}
                {loading && (
                    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </div>
                )}

                {/* Error or no repos */}
                {!loading && (error || projects.length === 0) && (
                    <div className="mx-auto max-w-md rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-8 text-center">
                        <p className="text-gray-300">
                            {error
                                ? "Couldn't load projects from GitHub right now."
                                : "No public projects to show yet."}
                        </p>
                        <a
                            href={`https://github.com/${GITHUB_USER}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-5 py-2 text-sm font-semibold text-gray-200 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                        >
                            <i className="fa-brands fa-github"></i>
                            View my GitHub
                        </a>
                    </div>
                )}

                {/* Projects */}
                {!loading && !error && projects.length > 0 && (
                    <Tabs.Root defaultValue="all">
                        <Tabs.List className="mx-auto flex w-fit max-w-full flex-wrap justify-center gap-2 rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-2">
                            {tabs.map((tab) => (
                                <Tabs.Trigger
                                    key={tab.value}
                                    value={tab.value}
                                    className="tabs-trigger cursor-pointer text-sm font-medium text-gray-300 transition hover:text-white"
                                >
                                    {tab.label}
                                </Tabs.Trigger>
                            ))}
                        </Tabs.List>

                        {tabs.map((tab) => (
                            <Tabs.Content key={tab.value} value={tab.value} className="mt-10 sm:mt-12">
                                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 xl:grid-cols-3">
                                    {projects
                                        .filter((p) => tab.value === "all" || p.language === tab.value)
                                        .map((project) => (
                                            <ProjectCard key={project.id} project={project} />
                                        ))}
                                </div>
                            </Tabs.Content>
                        ))}

                        <div className="mt-14 text-center">
                            <a
                                href={`https://github.com/${GITHUB_USER}?tab=repositories`}
                                target="_blank"
                                rel="noreferrer"
                                className="inline-flex items-center gap-2 rounded-full border border-[color:var(--border)] px-6 py-3 text-sm font-semibold text-gray-200 transition hover:border-[color:var(--accent)] hover:text-[color:var(--accent)]"
                            >
                                <i className="fa-brands fa-github"></i>
                                See all repositories on GitHub
                            </a>
                        </div>
                    </Tabs.Root>
                )}
            </div>
        </section>
    );
}

export default Projects;