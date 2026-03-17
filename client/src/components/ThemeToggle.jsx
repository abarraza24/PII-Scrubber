import { useEffect, useState } from "react";

function ThemeToggle() {
    const [theme, setTheme] = useState(() =>{
        return localStorage.getItem("theme") || "light"
    });

    useEffect(() => {
        document.documentElement.setAttribute("data-theme", theme);
        localStorage.setItem("theme", theme);
    }, [theme]);

    function handleToggle(){
        setTheme((currentTheme) =>(currentTheme === "light" ? "dark" : "light"));
    }

    return(
        <button type="button" className="btn btn-sm btn-outline" onClick={handleToggle}>
            {theme === "light" ? "Dark Mode" : "Light Mode"}
        </button>
    )
}

export default ThemeToggle;