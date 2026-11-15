// Slowly drifting colored light behind the hero. Colors come from index.css (--accent, --accent-2)
function Aurora() {
    return (
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
            <div className="aurora-blob aurora-1"></div>
            <div className="aurora-blob aurora-2"></div>
            <div className="aurora-blob aurora-3"></div>
        </div>
    );
}

export default Aurora;
