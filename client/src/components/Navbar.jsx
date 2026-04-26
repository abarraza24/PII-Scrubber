import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

function NavBar() {
  const navLinkClass = ({ isActive }) =>
    isActive
      ? "btn btn-sm rounded-full font-semibold text-white"
      : "btn btn-sm btn-ghost rounded-full font-medium";

  const activeStyle = { background: "var(--coral)", borderColor: "transparent" };

  return (
    <header className="sticky top-0 z-50 navbar-glass shadow-sm">
      <div className="mx-auto flex w-full max-w-6xl items-center gap-4 px-4 py-2.5 sm:px-6">

        <div className="flex flex-1 items-center gap-2.5">
          <div
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-white"
            style={{ background: "var(--navy)" }}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 1.5L2.25 4.5V9C2.25 12.73 5.18 16.22 9 17C12.82 16.22 15.75 12.73 15.75 9V4.5L9 1.5Z"
                fill="currentColor" fillOpacity="0.25"
                stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round"
              />
              <path
                d="M6.25 9.25L8 11 11.75 7"
                stroke="currentColor" strokeWidth="1.5"
                strokeLinecap="round" strokeLinejoin="round"
              />
            </svg>
          </div>
          <div>
            <span className="brand-text text-lg leading-none" style={{ color: "var(--navy)" }}>
              PII Scrubber
            </span>
            <span className="hidden sm:block text-xs text-base-content/40 leading-none mt-0.5 font-sans">
              Privacy by Alexis Barraza
            </span>
          </div>
        </div>

        {/* Nav + toggle */}
        <nav className="flex items-center gap-1">
          <NavLink
            to="/"
            className={navLinkClass}
            style={({ isActive }) => isActive ? activeStyle : {}}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className={navLinkClass}
            style={({ isActive }) => isActive ? activeStyle : {}}
          >
            About
          </NavLink>
          <div className="ml-1.5 pl-1.5 border-l border-base-300">
            <ThemeToggle />
          </div>
        </nav>
      </div>
    </header>
  );
}

export default NavBar;