import "./Hero.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";


function Hero() {
    return (
        <main className="home-page">
            <section className="hero" aria-labelledby="home-title">
                <div className="hero-text">
                    <p className="hello">Hi, I'm</p>
                    <h1 id="home-title">
                        <span>Nattaporn</span>
                        <span>Wangsuk</span>
                    </h1>
                    <h2>Computer Engineering Student</h2>
                    <p className="hero-description">
                        King Mongkut's University of Technology North Bangkok <br />
                    </p>
                    <p className="hero-quote">“Always ready to learn, explore new ideas, and grow through every opportunity.”</p>
                    <Link className="hero-cta" to="/about">
                        Explore My Journey <span aria-hidden="true">→</span>
                    </Link>
                    <div className="hero-socials" aria-label="Social links">
                        <a href="https://github.com/natthaporn47" target="_blank" rel="noreferrer" aria-label="GitHub">
                            <Icon icon="cib:github" aria-hidden="true" />
                        </a>
                        <a
                            href="https://mail.google.com/mail/?view=cm&fs=1&to=naththaphrnh@gmail.com"
                            aria-label="Email Nattaporn"
                            title="Email Nattaporn"
                            target="_blank"
                            rel="noreferrer"
                        >
                            <Icon icon="clarity:email-outline-badged" aria-hidden="true" />
                        </a>
                        <Link to="/contact" aria-label="Contact">
                            <Icon icon="mdi:arrow-top-right" aria-hidden="true" />
                        </Link>
                    </div>
                </div>

                <div className="hero-visual" aria-label="Design and development workspace">
                    <div className="study-note">
                        <div className="study-heading">
                            <Icon icon="mdi:book-open-page-variant" aria-hidden="true" />
                            <span>Currently Learning</span>
                        </div>
                        <ul>
                            <li>React</li>
                            <li>JavaScript</li>
                            <li>IoT</li>
                            <li>Cloud Computing</li>
                        </ul>
                    </div>

                    <div className="idea-note">
                        Good Ideas<br />
                        Better<br />
                        Tomorrow <span>♡</span>
                    </div>

                    <div className="editor-window" aria-hidden="true">
                        <div className="editor-toolbar">
                            <div className="window-dots"><i></i><i></i><i></i></div>
                            <span>Home.js</span>
                        </div>
                        <div className="editor-content">
                            <div className="editor-gutter">1<br />2<br />3<br />4<br />5<br />6<br />7<br />8<br />9<br />10<br />11</div>
                            <pre><span className="syntax-keyword">const</span> developer = {'{'}<br />  name: <span className="syntax-string">"Nattaporn Wangsuk"</span>,<br />  role: <span className="syntax-string">"Computer Engineering Student"</span>,<br />  interests: [<br />    <span className="syntax-string">"UX/UI Design"</span>,<br />    <span className="syntax-string">"Frontend Development"</span>,<br />    <span className="syntax-string">"Web Development"</span>,<br />  ],<br />  goal: <span className="syntax-string">"Create useful things"</span><br />{'}'};<br /><br /><span className="syntax-comment">console.log("Welcome to my portfolio!");</span></pre>
                        </div>
                    </div>

                    <div className="design-note">
                        <Icon icon="mdi:lightbulb-on-outline" aria-hidden="true" />
                        <span>Design<br />Develop<br />Learn<br />Repeat</span>
                    </div>

                    <div className="skill-stack" aria-label="Areas of interest">
                        <div className="floating-skill skill-design"><Icon icon="mdi:vector-square" aria-hidden="true" />UI/UX</div>
                        <div className="floating-skill skill-frontend"><Icon icon="mdi:code-tags" aria-hidden="true" />Frontend</div>
                        <div className="floating-skill skill-web"><Icon icon="mdi:web" aria-hidden="true" />Web</div>
                        <div className="floating-skill skill-iot"><Icon icon="mdi:chip" aria-hidden="true" />IoT</div>
                    </div>

                    <div className="desk-plant" aria-hidden="true">
                        <span></span><span></span><span></span><span></span>
                        <div></div>
                    </div>
                    <span className="visual-spark spark-one" aria-hidden="true">✦</span>
                    <span className="visual-spark spark-two" aria-hidden="true">✧</span>
                </div>

            </section>
        </main>
    );
}

export default Hero;