import Hero from "../Hero/Hero.js";
import HomeSections from "../components/HomeSections";
import "./Home.css";


function Home(){

    return(

        <main className="home-root">
            <Hero />
            <HomeSections />
        </main>

    )

}


export default Home;
