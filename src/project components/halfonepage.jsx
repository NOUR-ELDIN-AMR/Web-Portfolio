import { useEffect, useId, useRef, useState } from "react";

/* ------------------------------------------------------------------ */
/*  Data – edit freely                                                */
/*  (The percentages and descriptions for the back-end skills are     */
/*   placeholders – change them to what is true for you.)             */
/* ------------------------------------------------------------------ */

const GROUPS = [
    {
        id: "frontend",
        label: "Front-End",
        note: "Interfaces people enjoy using",
        skills: [
            { name: "HTML5", value: 95, color: "#ff5a26", level: "Expert", desc: "Semantic, accessible and SEO-friendly markup.", tags: ["Semantic", "A11y", "SEO"] },
            { name: "CSS3", value: 90, color: "#2f6bff", level: "Expert", desc: "Flexbox, Grid, animations and pixel-perfect layouts.", tags: ["Grid", "Animations", "Responsive"] },
            { name: "JavaScript", value: 85, color: "#ffe119", level: "Advanced", desc: "Modern ES6+, async code and clean DOM logic.", tags: ["ES6+", "Async", "APIs"] },
            { name: "React.js", value: 85, color: "#67d8ff", level: "Advanced", desc: "Component-driven UIs with hooks and reusable patterns.", tags: ["Hooks", "Router", "Components"] },
            { name: "Tailwind CSS", value: 75, color: "#9fffe7", level: "Proficient", desc: "Utility-first styling for fast, consistent interfaces.", tags: ["Utility-first", "Theming", "Dark mode"] },
        ],
    },
    {
        id: "backend",
        label: "Back-End",
        note: "The APIs and data behind them",
        skills: [
            { name: "Node.js", value: 80, color: "#8cc84b", level: "Advanced", desc: "Server-side JavaScript, async I/O and scalable services.", tags: ["Runtime", "npm", "Nodemon"] },
            { name: "Express.js", value: 80, color: "#cbd5e1", level: "Advanced", desc: "Routing, middleware and clean REST API structure.", tags: ["Routing", "Middleware", "REST"] },
            { name: "MongoDB", value: 75, color: "#00ed64", level: "Proficient", desc: "Flexible NoSQL data modeling, queries and aggregation.", tags: ["NoSQL", "Queries", "Indexes"] },
            { name: "Mongoose ODM", value: 72, color: "#ff7a59", level: "Proficient", desc: "Schemas, validation and tidy data-access layers.", tags: ["Schemas", "Models", "Validation"] },
            { name: "REST APIs", value: 80, color: "#f472b6", level: "Advanced", desc: "Resource-based endpoints, JSON and clear status codes.", tags: ["CRUD", "JSON", "Auth"] },
        ],
    },
];

// Tools shown in the marquee strip – replace with your own.
const TOOLS = [
    "GitHub",
    "LinkedIn",
    "Web Development",
    "Front-End Web Development",
    "Back-End Web Development",
    "HTML5",
    "Cascading Style Sheets (CSS)",
    "Tailwind CSS",
    "JavaScript",
    "React.js",
    "Redux.js",
    "Node.js",
    "Nodemon",
    "Express.js",
    "MongoDB",
    "Mongoose ODM",
    "Responsive Design",
    "Vite",
    "REST APIs",
    "Figma to Code",
    "Performance",
    "Accessibility",
    "Cross-browser",
];

const GRADIENT =
    "bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)]";

/* ------------------------------------------------------------------ */
/*  Hooks                                                             */
/* ------------------------------------------------------------------ */

const reducedMotion = () =>
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

// Fires once when the element enters the viewport. Each card watches itself,
// so cards animate when you actually scroll to them (important on phones,
// where the section is very tall).
function useInView(threshold = 0.15) {
    const ref = useRef(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    io.disconnect();
                }
            },
            { threshold }
        );
        io.observe(node);
        return () => io.disconnect();
    }, [threshold]);

    return [ref, inView];
}

// True while the element is on screen (pauses the marquee when it isn't).
function useOnScreen() {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;
        const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting));
        io.observe(node);
        return () => io.disconnect();
    }, []);

    return [ref, visible];
}

/* ------------------------------------------------------------------ */
/*  Progress ring                                                     */
/* ------------------------------------------------------------------ */

const SIZE = 150;
const STROKE = 9;
const R = 62;
const C = 2 * Math.PI * R;

function Ring({ value, color, active, delay }) {
    const gid = useId();
    const numRef = useRef(null);

    // Count-up writes straight to the DOM – no React renders per frame.
    useEffect(() => {
        const el = numRef.current;
        if (!el || !active) return;

        if (reducedMotion()) {
            el.textContent = value;
            return;
        }

        const duration = 1600;
        let raf;
        let start;
        const tick = (t) => {
            start ??= t;
            const p = Math.min(Math.max((t - start - delay) / duration, 0), 1);
            el.textContent = Math.round(value * (1 - Math.pow(1 - p, 3)));
            if (p < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
    }, [active, value, delay]);

    return (
        <div className="relative h-[130px] w-[130px] sm:h-[150px] sm:w-[150px]">
            <div
                aria-hidden="true"
                className="absolute rounded-full"
                style={{
                    inset: -14,
                    background: `radial-gradient(circle, ${color}40 35%, transparent 70%)`,
                }}
            />

            <svg
                viewBox={`0 0 ${SIZE} ${SIZE}`}
                className="relative h-full w-full -rotate-90"
                aria-hidden="true"
            >
                <defs>
                    <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
                        <stop offset="0%" stopColor={color} />
                        <stop offset="100%" stopColor={color} stopOpacity="0.5" />
                    </linearGradient>
                </defs>

                <circle cx={SIZE / 2} cy={SIZE / 2} r={R} fill="none" stroke="var(--border)" strokeWidth={STROKE} />

                <circle
                    cx={SIZE / 2}
                    cy={SIZE / 2}
                    r={R}
                    fill="none"
                    stroke={`url(#${gid})`}
                    strokeWidth={STROKE}
                    strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={active ? C * (1 - value / 100) : C}
                    style={{
                        transition: `stroke-dashoffset 1.6s cubic-bezier(.22,1,.36,1) ${delay}ms`,
                    }}
                />
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold tabular-nums text-white sm:text-3xl">
                    <span ref={numRef}>0</span>
                    <span className="text-lg text-white/60">%</span>
                </span>
            </div>
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Skill card                                                        */
/* ------------------------------------------------------------------ */

function SkillCard({ skill, index }) {
    const { name, value, color, level, desc, tags } = skill;
    const [ref, active] = useInView();
    const delay = (index % 3) * 110;
    const frame = useRef(0);

    // Cursor spotlight, throttled to one update per animation frame.
    const onMove = (e) => {
        const el = e.currentTarget;
        const { clientX, clientY } = e;
        cancelAnimationFrame(frame.current);
        frame.current = requestAnimationFrame(() => {
            const rect = el.getBoundingClientRect();
            el.style.setProperty("--mx", `${clientX - rect.left}px`);
            el.style.setProperty("--my", `${clientY - rect.top}px`);
        });
    };

    return (
        <article
            ref={ref}
            onMouseMove={onMove}
            aria-label={`${name} – ${value}% (${level})`}
            className={`group relative w-full overflow-hidden rounded-3xl border border-white/10 bg-[#0f1628]/80 p-6 text-center transition-[transform,opacity,border-color] duration-500 sm:p-8 md:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)] [@media(hover:hover)]:hover:-translate-y-2 [@media(hover:hover)]:hover:border-white/20 ${
                active ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
            }`}
            style={{ transitionDelay: active ? `${delay}ms` : "0ms" }}
        >
            <div
                className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                style={{
                    background: `radial-gradient(300px circle at var(--mx, 50%) var(--my, 50%), ${color}22, transparent 65%)`,
                }}
            />

            <div
                className="absolute inset-x-10 top-0 h-px opacity-70"
                style={{ background: `linear-gradient(90deg, transparent, ${color}, transparent)` }}
            />

            <div className="relative flex flex-col items-center">
                <Ring value={value} color={color} active={active} delay={delay} />

                <h3 className="mt-6 text-xl font-bold text-white sm:mt-8 sm:text-2xl">{name}</h3>

                <span
                    className="mt-3 rounded-full border px-4 py-1 text-[11px] font-semibold uppercase tracking-[3px]"
                    style={{ color, borderColor: `${color}55`, background: `${color}14` }}
                >
                    {level}
                </span>

                <p className="mt-5 max-w-[16rem] text-sm leading-relaxed text-gray-400">{desc}</p>

                <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {tags.map((t) => (
                        <span key={t} className="rounded-md border border-white/10 bg-white/5 px-2.5 py-1 text-xs text-gray-300">
                            {t}
                        </span>
                    ))}
                </div>
            </div>
        </article>
    );
}

/* ------------------------------------------------------------------ */
/*  Group heading                                                     */
/* ------------------------------------------------------------------ */

function GroupHeading({ label, note }) {
    return (
        <div className="mb-10 flex items-center gap-4 sm:gap-6">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[color:var(--border)]" />
            <div className="text-center">
                <h3 className={`${GRADIENT} bg-clip-text text-xl font-bold text-transparent sm:text-2xl`}>
                    {label}
                </h3>
                <p className="mt-1 text-xs uppercase tracking-[3px] text-gray-500">{note}</p>
            </div>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[color:var(--border)]" />
        </div>
    );
}

/* ------------------------------------------------------------------ */
/*  Section                                                           */
/* ------------------------------------------------------------------ */

function Half1() {
    const [marqueeRef, marqueeVisible] = useOnScreen();

    return (
        <section
            id="half1"
            className="bg-grad-1 relative isolate w-full scroll-mt-28 overflow-hidden py-24 md:py-36"
        >
            <style>{`
                @keyframes h1-marquee { to { transform: translate3d(-50%, 0, 0); } }
                .h1-marquee { will-change: transform; animation: h1-marquee 70s linear infinite; animation-play-state: paused; }
                .h1-marquee.is-running { animation-play-state: running; }
                .h1-marquee-wrap:hover .h1-marquee { animation-play-state: paused; }
                @media (prefers-reduced-motion: reduce) { .h1-marquee { animation: none; } }
            `}</style>

            {/* static background – plain gradients, no blur filters */}
            <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
                        backgroundSize: "56px 56px",
                    }}
                />
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "radial-gradient(600px circle at 0% 30%, color-mix(in srgb, var(--accent) 18%, transparent), transparent 70%), radial-gradient(600px circle at 100% 75%, color-mix(in srgb, var(--accent-3) 18%, transparent), transparent 70%)",
                    }}
                />
            </div>

            {/* header */}
            <header className="mx-auto max-w-2xl px-6 text-center">
                <p className="text-sm uppercase tracking-[6px] text-[color:var(--accent)]">
                    Technical Expertise
                </p>

                <h2 className={`${GRADIENT} mt-4 bg-clip-text text-4xl font-bold text-transparent md:text-6xl`}>
                    Full-Stack Skills
                </h2>

                <div className={`${GRADIENT} mx-auto mt-5 h-1 w-24 rounded-full`} />

                <p className="mt-6 leading-relaxed text-gray-400">
                    From responsive React interfaces to Node.js, Express and MongoDB
                    back-ends: the technologies I use to build complete web
                    applications from end to end.
                </p>
            </header>

            {/* skill groups */}
            <div className="mx-auto mt-16 max-w-6xl space-y-20 px-6 md:mt-24">
                {GROUPS.map((group) => (
                    <div key={group.id}>
                        <GroupHeading label={group.label} note={group.note} />
                        <div className="flex flex-wrap justify-center gap-6">
                            {group.skills.map((skill, i) => (
                                <SkillCard key={skill.name} skill={skill} index={i} />
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {/* tools marquee */}
            <div ref={marqueeRef} className="mx-auto mt-24 max-w-6xl px-6">
                <p className="mb-6 text-center text-xs uppercase tracking-[5px] text-gray-500">
                    Also working with
                </p>

                <div className="h1-marquee-wrap relative overflow-hidden">
                    <div className={`h1-marquee flex w-max gap-4 ${marqueeVisible ? "is-running" : ""}`}>
                        {[...TOOLS, ...TOOLS].map((tool, i) => (
                            <span
                                key={`${tool}-${i}`}
                                className="whitespace-nowrap rounded-full border border-white/10 bg-white/[0.04] px-5 py-2 text-sm text-gray-300"
                            >
                                {tool}
                            </span>
                        ))}
                    </div>

                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-[#0b1220] to-transparent sm:w-24" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-[#0b1220] to-transparent sm:w-24" />
                </div>
            </div>
        </section>
    );
}

export default Half1;