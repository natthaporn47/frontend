import "./Hero.css";


function Hero(){

    return(

        <section className="hero">


            <div className="hero-text">


                <p className="hello">
                    Hi, I'm
                </p>


                <h1>
                    Nattaporn
                    <br/>
                    Wangsuk
                </h1>


                <h3>
                    Computer Engineering Student
                </h3>


                <p>
                    Interested in UX/UI Design,
                    <br/>
                    Frontend Development
                    <br/>
                    and Web Development
                </p>


                <button>
                    Explore My Journey →
                </button>


            </div>



            <div className="hero-image">


    <div className="circle">


        <div className="card card1">
            React
        </div>


        <div className="card card2">
            UX/UI
        </div>


        <div className="card card3">
            IoT
        </div>


    </div>



    <div className="keywords">


        <span>Design</span>

        <span>Develop</span>

        <span>Learn</span>

        <span>Repeat</span>


    </div>


</div>


        </section>


    )

}


export default Hero;