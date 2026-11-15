import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";
import "../main.css";
import Aurora from "./Aurora";

const GRADIENT_3 =
    "bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)]";

const BTN =
    "inline-block rounded-3xl border border-blue-50 px-5 py-2 font-semibold text-[color:var(--accent)] transition-all duration-200 hover:scale-105 hover:bg-gradient-to-r hover:from-[color:var(--accent-40)] hover:via-[color:var(--accent-2-40)] hover:to-[color:var(--accent-3-40)]";

// Typing animation: role, pause (ms), role, pause ...
const ROLES = [
    "Full-Stack Developer", 2000,
    "React Developer", 2000,
    "Node.js Developer", 2000,
    "Front-End & Back-End Developer", 1500,
];

function Main() {
    return (
        <section
            id="home"
            className="bigmain relative isolate flex min-h-screen w-full flex-col items-center justify-center gap-16 overflow-hidden px-6 pb-20 pt-36 sm:px-12 lg:flex-row lg:gap-8 lg:px-0 lg:pb-0 lg:pt-24"
        >
            <Aurora />

            {/* ---------- Left: text ---------- */}
            <div className="left w-full max-w-2xl lg:w-[55%] lg:max-w-none lg:pl-16 lg:pr-8 xl:pl-32">
                <span className="mb-6 inline-flex items-center gap-2 rounded-3xl border border-blue-200 px-4 py-2 text-base sm:mb-10 sm:text-lg">
                    <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-[color:var(--accent)]"></span>
                    <span className="text-gray-400">Available for opportunities</span>
                </span>

                <h1 className="font-mono text-3xl sm:text-5xl">
                    Hi! I'm{" "}
                    <span className={`${GRADIENT_3} bg-clip-text text-transparent`}>
                        Nour Eldin
                    </span>
                </h1>

                {/* min-height stops the layout jumping while the text types */}
                <div className="mt-3 min-h-[4rem] sm:min-h-[3rem]">
                    <TypeAnimation
                        className="bg-gradient-to-r from-[color:var(--accent)] to-[color:var(--accent-2)] bg-clip-text font-mono text-2xl text-transparent sm:text-4xl"
                        sequence={ROLES}
                        speed={50}
                        repeat={Infinity}
                    />
                </div>

                <p
                    className={`${GRADIENT_3} mt-4 max-w-2xl bg-clip-text text-lg leading-relaxed text-transparent sm:text-xl lg:text-2xl`}
                >
                    Building complete web applications, from pixel-perfect React
                    interfaces to scalable Node.js, Express and MongoDB back-ends.
                    Passionate about clean code, solid architecture and delightful
                    user experiences.
                </p>

                <div className="mt-8 flex flex-wrap gap-4">
                    <a href="#projects" className={BTN}>
                        View My Projects
                    </a>
                    <a href="#touch" className={BTN}>
                        Get in Touch
                    </a>
                </div>
            </div>

            {/* ---------- Right: code card ---------- */}
            <div className="right relative flex w-full max-w-md items-center justify-center lg:w-[45%] lg:max-w-none lg:pr-8">
                {/* glow behind the card (plain gradient, no blur filter = smooth) */}
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute left-1/2 top-1/2 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 sm:h-96 sm:w-96"
                    style={{
                        background:
                            "radial-gradient(circle, var(--accent-2) 0%, var(--accent-3) 40%, transparent 70%)",
                    }}
                />

                <div className="relative z-20 w-full max-w-sm rounded-2xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 font-mono text-sm shadow-lg sm:max-w-md sm:p-10 sm:text-base">
                    <motion.span
                        className="absolute -top-4 right-4 rounded-full border border-[color:var(--accent-2)] bg-[color:var(--surface)] px-4 py-2 text-sm text-[color:var(--accent-2)] sm:right-5 sm:px-6 sm:py-3"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        ⚛ Front-End
                    </motion.span>

                    <p className="mb-5 text-gray-500">Nour.jsx</p>

                    <p>
                        <span className="text-[color:var(--accent-2)]">const</span>{" "}
                        <span className="text-[color:var(--accent)]">developer</span> = {"{"}
                    </p>

                    <p className="ml-5 break-words">
                        <span className="text-gray-400">name:</span>{" "}
                        <span className="text-green-400">"Nour Eldin"</span>,
                    </p>

                    <p className="ml-5 break-words">
                        <span className="text-gray-400">role:</span>{" "}
                        <span className="text-green-400">"Full-Stack Developer"</span>,
                    </p>

                    <p className="ml-5 break-words">
                        <span className="text-gray-400">frontend:</span>{" "}
                        <span className="text-green-400">["React", "Tailwind"]</span>,
                    </p>

                    <p className="ml-5 break-words">
                        <span className="text-gray-400">backend:</span>{" "}
                        <span className="text-green-400">
                            ["Node", "Express", "MongoDB"]
                        </span>
                    </p>

                    <p>{"}"}</p>

                    <motion.span
                        className="absolute -bottom-4 left-4 rounded-full border border-[color:var(--accent)] bg-[color:var(--surface)] px-4 py-1 text-sm text-[color:var(--accent)] sm:left-5"
                        animate={{ y: [0, -12, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    >
                        ⚙ Back-End
                    </motion.span>
                </div>
            </div>
        </section>
    );
}

export default Main;