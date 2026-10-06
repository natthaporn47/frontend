import { NavLink, Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import "./Navbar.css";


function Navbar(){
    const [isOpen, setIsOpen] = useState(false);
    const { pathname } = useLocation();
    useEffect(() => setIsOpen(false), [pathname]);

    return(

        <nav className="navbar" aria-label="Main navigation" onKeyDown={(event) => { if (event.key === "Escape") setIsOpen(false); }}>

            <Link className="logo" to="/">
                Nattaporn.
            </Link>
            <button type="button" className="menu-toggle" aria-label={isOpen ? "Close menu" : "Open menu"} title={isOpen ? "Close menu" : "Open menu"} aria-expanded={isOpen} aria-controls="main-menu" onClick={() => setIsOpen(!isOpen)}>
                <Icon icon={isOpen ? "mdi:close" : "mdi:menu"} aria-hidden="true" />
            </button>


            <div id="main-menu" className={`menu${isOpen ? " menu-open" : ""}`}>

                <NavLink to="/" end>
                    Home
                </NavLink>
                <NavLink to="/about">
                   About
                </NavLink>

                <NavLink to="/projects">
                    Projects
                </NavLink>
                <NavLink to="/skills">
                    Skills
                </NavLink>
                <NavLink to="/contact">
                    Contact
                </NavLink>

            </div>
        </nav>

    )

}


export default Navbar;
