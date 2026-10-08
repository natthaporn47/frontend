import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./Navbar.css";


function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    useEffect(() => setIsOpen(false), [pathname]);
    const returnHome = () => {
        setIsOpen(false);
        if (pathname === "/") window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
    };

    return(

        <nav className="navbar navbar-capsule" aria-label="Main navigation" onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}>

            <Link className="logo" to="/" onClick={returnHome}>
                <span className="nav-monogram" aria-hidden="true">NW</span>
                Nattaporn <Icon icon="material-icon-theme:husky" aria-hidden="true" />
            </Link>
            <button type="button" className="menu-toggle" aria-label={isOpen ? "Close menu" : "Open menu"} title={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="main-menu" onClick={() => setIsOpen(!isOpen)}>
                <Icon icon={isOpen ? "mdi:close" : "mdi:menu"} aria-hidden="true" />
            </button>


            <div id="main-menu" className={`menu${isOpen ? " menu-open" : ""}`}>

                <NavLink to="/" end onClick={returnHome}>
                    Home
                </NavLink>
                <NavLink to="/about">
                   About
                </NavLink>

                <NavLink to="/skills">
                    Skills
                </NavLink>
                <NavLink to="/projects">
                    Projects
                </NavLink>
                <NavLink to="/contact">
                    Contact
                </NavLink>

            </div>
        </nav>

    )

}


export default Navbar;
