import { Link } from "react-router-dom";
import "./Navbar.css";


function Navbar(){

    return(

        <nav className="navbar">

            <div className="logo">
                Nattaporn.
            </div>


            <div className="menu">

                <Link to="/">
                    Home
                </Link>

                <Link to="/projects">
                    Projects
                </Link>

                <Link to="/contact">
                    Contact
                </Link>

            </div>


            <button className="contactBtn">
                Let's Talk
            </button>


        </nav>

    )

}


export default Navbar;