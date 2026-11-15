const INPUT =
    "h-12 w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[color:var(--accent)]";

const INFO = [
    { label: "Location", value: "Cairo, Egypt", icon: "fa-solid fa-location-dot", bg: "bg-[color:var(--accent)]" },
    { label: "Email", value: "collagenour1@gmail.com", icon: "fa-solid fa-envelope", bg: "bg-[color:var(--accent-2)]" },
    { label: "Focus", value: "Full-Stack Development", icon: "fa-solid fa-code", bg: "bg-[color:var(--accent)]" },
];

function Touch() {
    return (
        <section id="touch" className="bg-grad-1 w-full scroll-mt-24 overflow-hidden py-20 sm:py-24">
            <div className="flex flex-col items-center px-6">
                <p className="text-sm uppercase tracking-[6px] text-[color:var(--accent)]">
                    Say Hello
                </p>

                <h2 className="mt-4 bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)] bg-clip-text text-3xl font-bold text-transparent">
                    Get In Touch
                </h2>

                <div className="mt-4 h-1 w-24 rounded-full bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)]"></div>

                <p className="mt-6 max-w-2xl text-center text-sm text-gray-400">
                    Open to freelance projects, internships, and full-time opportunities. Let's build something great together.
                </p>
            </div>

            {/* Cards */}
            <div className="mx-auto mt-14 flex max-w-6xl flex-col items-center gap-8 px-6 sm:mt-20 sm:gap-10 lg:flex-row lg:items-stretch lg:justify-center">

                {/* Left: info */}
                <div className="w-full max-w-[500px] rounded-3xl border border-[color:var(--border)] bg-[color:var(--surface)] p-6 sm:p-8">
                    <h3 className="mt-2 text-xl font-bold text-white sm:mt-5 sm:text-2xl">
                        NOUR ELDIN AMR
                    </h3>

                    <p className="mt-5 text-base leading-8 text-gray-400">
                        Full-Stack Developer based in Egypt. I love building elegant,
                        responsive front-ends and robust back-end APIs, and I'm always
                        open to new opportunities.
                    </p>

                    <div className="mt-8 space-y-6 sm:mt-10">
                        {INFO.map(({ label, value, icon, bg }) => (
                            <div key={label} className="flex items-center gap-4">
                                <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-[color:var(--bg)] ${bg}`}>
                                    <i className={icon}></i>
                                </div>

                                <div className="min-w-0">
                                    <p className="text-sm text-gray-500">{label}</p>
                                    <p className="break-all text-base text-white sm:text-xl">{value}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right: form */}
                <div className="w-full max-w-[500px] rounded-3xl border border-gray-500 bg-[color:var(--bg-alt)] p-6 sm:p-8">
                    <form className="mt-2 space-y-5 sm:mt-7">
                        <h3 className="text-xl font-bold text-white sm:text-2xl">
                            Send a Message
                        </h3>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <input type="text" name="firstName" placeholder="First Name" className={INPUT} />
                            <input type="text" name="lastName" placeholder="Last Name" className={INPUT} />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <input type="email" name="email" placeholder="Email Address" className={INPUT} />
                            <input type="tel" name="phone" placeholder="Phone No. (optional)" className={INPUT} />
                        </div>

                        <textarea
                            rows="5"
                            name="message"
                            placeholder="Your message..."
                            className="w-full rounded-xl border border-[color:var(--border)] bg-[color:var(--surface)] px-5 py-3 text-sm text-white placeholder-gray-500 outline-none transition focus:border-[color:var(--accent)]"
                        ></textarea>

                        <button
                            type="submit"
                            className="mt-2 h-14 w-full rounded-xl bg-gradient-to-r from-[color:var(--accent)] via-[color:var(--accent-2)] to-[color:var(--accent-3)] text-lg font-semibold text-white shadow-[0_0_30px_var(--accent-35)] transition-all duration-300 hover:scale-[1.02] sm:text-xl"
                        >
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default Touch;