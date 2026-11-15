function Nav() {
    return (
        // Full-width fixed wrapper that centers the nav horizontally.
        // pointer-events-none keeps its empty sides from blocking clicks.
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 flex justify-center">
            <div className="pointer-events-auto mt-7 h-fit w-fit rounded-xl border border-[color:var(--border)] bg-gradient-to-r from-[color:var(--surface)] via-[color:var(--accent-2-40)] to-[color:var(--accent-3-40)] opacity-90">
                <nav className="flex w-fit items-center gap-9 rounded-xl py-6">
                    <span className="flex px-9 text-[color:var(--accent)]">NOUR ELDIN</span>

                    <span className="parts">
                        <ul className="flex space-x-7 px-9">
                            <li className="transition duration-200 hover:text-[color:var(--accent)]">
                                <a href="#home">home</a>
                            </li>
                            <li className="transition duration-200 hover:text-[color:var(--accent)]">
                                <a href="#half1">skills</a>
                            </li>
                            <li className="transition duration-200 hover:text-[color:var(--accent)]">
                                <a href="#projects">project</a>
                            </li>
                            <li className="transition duration-200 hover:text-[color:var(--accent)]">
                                <a href="#touch">contact</a>
                            </li>
                        </ul>
                    </span>

                    <span>
                        <ul className="flex space-x-6">
                            <li className="transition duration-200 hover:text-gray-300">
                                <a href="https://github.com/NOUR-ELDIN-AMR" target="_blank" rel="noreferrer" aria-label="GitHub">
                                    <i className="fa-brands fa-github"></i>
                                </a>
                            </li>
                            <li className="transition duration-200 hover:text-[color:var(--accent-2)]">
                                <a href="https://www.linkedin.com/in/nour-eldin-amr-141952288/" target="_blank" rel="noreferrer" aria-label="LinkedIn">
                                    <i className="fa-brands fa-linkedin"></i>
                                </a>
                            </li>
                        </ul>
                    </span>

                    <span className="btn1">
                        <a href="#touch">
                            <button className="mr-7 rounded-lg px-2 py-2 transition-all duration-300 hover:scale-[1.01] hover:bg-gradient-to-r hover:from-[color:var(--accent)] hover:via-[color:var(--accent-2)] hover:to-[color:var(--accent-3)] hover:shadow-[0_0_30px_var(--accent-35)]">
                                let's connect
                            </button>
                        </a>
                    </span>
                </nav>
            </div>
        </div>
    );
}

export default Nav;