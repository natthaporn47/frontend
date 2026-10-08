import Hero from "../Hero/Hero.js";
import HomeSections from "../components/HomeSections";
import "./Home.css";
import "./HomeNotebook.css";


function Home(){

    return(

        <main className="home-root home-notebook home-reference">
            <Hero />
            <HomeSections />
        </main>

    )

}


export default Home;
