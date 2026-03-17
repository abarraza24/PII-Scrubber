import { NavLink } from "react-router-dom";
import ThemeToggle from "./ThemeToggle.jsx";

function NavBar() {
    const navLinkClass = ({ isActive }) => isActive ? "btn btn-sm btn-primary" : "btn btn-sm btn-ghost";
    return(
        <header className="navbar border-b border-base-300 bg-base-100 shadow-sm">
            <div className="mx-auto flex w-full max-w-7xl items-center px-4">
                <div className="flex-1">
                    <span className="text-xl font-bold">PII Scrubber</span>
                </div>
            </div>

            <div className="flex items-center gap-2">
                <NavLink to="/" className={navLinkClass}>
                    Home
                </NavLink>

                <NavLink to="/about" className={navLinkClass}>
                    about
                </NavLink>
            
              <ThemeToggle/>
            </div>

        </header>
    );
}

export default NavBar;