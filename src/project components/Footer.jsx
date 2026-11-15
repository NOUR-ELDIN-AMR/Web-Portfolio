const NAV = [
    { label: "Home", href: "#home" },
    { label: "Skills", href: "#half1" },
    { label: "Projects", href: "#projects" },
    { label: "Contact", href: "#touch" },
];

const SERVICES = [
    "Full-Stack Web Development",
    "Responsive Front-End with React & Tailwind",
    "REST APIs with Node.js & Express",
    "Database Design with MongoDB & Mongoose",
    "UI / UX Implementation",
];

const SOCIALS = [
    { label: "GitHub", href: "https://github.com/YOUR-USERNAME", icon: "fa-brands fa-github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/YOUR-PROFILE", icon: "fa-brands fa-linkedin" },
];

function Footer() {
    return (
        <footer className="bg-grad-3 border-t border-[color:var(--border)]">

            {/* Subscribe */}
            <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 border-b border-[color:var(--border)] px-6 py-8 text-center sm:px-8 lg:flex-row lg:gap-8 lg:py-5 lg:text-left">
                <div>
                    <h2 className="text-xl font-semibold text-white sm:text-2xl">
                        Stay Updated
                    </h2>

                    <p className="mt-3 text-gray-400">
                        Subscribe to see my latest projects & articles.
                    </p>
                </div>

                <div className="flex w-full flex-col gap-4 sm:w-auto sm:flex-row">
                    <input
                        type="email"
                        placeholder="Enter your email"
                        className="w-full rounded-full border border-[color:var(--border)] bg-[color:var(--surface)] px-6 py-4 text-white outline-none transition placeholder:text-gray-500 focus:border-[color:var(--accent)] sm:w-64"
                    />

                    <button
                        type="submit"
                        className="rounded-full bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)] px-10 py-4 font-semibold text-white transition duration-300 hover:scale-105 hover:shadow-[0_0_25px_var(--accent-35)] sm:py-0"
                    >
                        Subscribe
                    </button>
                </div>
            </div>

            {/* Columns */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-6 py-12 sm:px-8 md:grid-cols-3 md:gap-16 md:py-14">

                {/* Brand */}
                <div>
                    <h2 className="text-xl font-bold text-white">
                        <span className="mr-1 inline-block h-2 w-2 animate-pulse rounded-full bg-[color:var(--accent)]"></span>{" "}
                        Portfolio
                    </h2>

                    <p className="mt-6 leading-8 text-gray-400">
                        Full-Stack Developer building complete web applications, from
                        responsive React front-ends to Node.js, Express and MongoDB
                        back-ends.
                    </p>

                    <div className="mt-8 flex gap-5 text-xl">
                        {SOCIALS.map(({ label, href, icon }) => (
                            <a
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                                aria-label={label}
                                className="text-gray-400 transition hover:text-[color:var(--accent)]"
                            >
                                <i className={icon}></i>
                            </a>
                        ))}
                    </div>
                </div>

                {/* Navigation */}
                <div>
                    <h2 className="text-xl font-bold text-white">Navigation</h2>

                    <div className="mt-6 flex flex-col gap-4 text-sm md:mt-8 md:gap-5">
                        {NAV.map(({ label, href }) => (
                            <a
                                key={label}
                                href={href}
                                className="text-gray-400 transition hover:text-[color:var(--accent)]"
                            >
                                {label}
                            </a>
                        ))}
                    </div>
                </div>

                {/* What I do */}
                <div>
                    <h2 className="text-xl font-bold text-white">What I Do</h2>

                    <div className="mt-6 flex flex-col gap-4 text-sm md:mt-8 md:gap-5">
                        {SERVICES.map((s) => (
                            <p key={s} className="text-gray-400">
                                {s}
                            </p>
                        ))}
                    </div>
                </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-[color:var(--border)] px-6 py-8">
                <p className="text-center text-sm text-gray-500 sm:text-base">
                    © 2026 Nour Eldin Amr — All Rights Reserved
                </p>
            </div>
        </footer>
    );
}

export default Footer;