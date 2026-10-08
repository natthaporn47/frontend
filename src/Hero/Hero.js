import "./Hero.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { useRef, useState } from "react";
import TypingLine from "../components/TypingLine";

const interests = [
    { label: "UI/UX", icon: "mdi:vector-square", focus: "UX/UI Design", tools: "Figma, wireframes, prototypes" },
    { label: "Frontend", icon: "mdi:code-tags", focus: "Frontend Development", tools: "React, JavaScript, CSS" },
    { label: "Web", icon: "mdi:web", focus: "Web Development", tools: "Node.js, REST API, JSON" },
    { label: "IoT", icon: "mdi:chip", focus: "IoT & Embedded Systems", tools: "ESP32, Arduino, MQTT" },
];

function Hero() {
    const [activeInterest, setActiveInterest] = useState(1);
    const [profileRunning, setProfileRunning] = useState(false);
    const scene = useRef(null);
    const interest = interests[activeInterest];
    const moveWorkspace = (event) => {
        if (event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
        const bounds = event.currentTarget.getBoundingClientRect();
        scene.current.style.setProperty("--pointer-x", `${((event.clientX - bounds.left) / bounds.width - 0.5) * 8}px`);
        scene.current.style.setProperty("--pointer-y", `${((event.clientY - bounds.top) / bounds.height - 0.5) * 8}px`);
    };
    const resetWorkspace = () => {
        scene.current.style.setProperty("--pointer-x", "0px");
        scene.current.style.setProperty("--pointer-y", "0px");
    };
    return (
        <div className="home-page">
            <section className="hero scrapbook-hero" aria-labelledby="home-title" onPointerMove={moveWorkspace} onPointerLeave={resetWorkspace}>
                <div className="hero-text">
                    <p className="hello">Hi, I'm</p>
                    <h1 id="home-title"><span>Nattaporn</span><span>Wangsuk</span></h1>
                    <h2>Computer Engineering Student</h2>
                    <TypingLine />
                    <p className="hero-role-list">Frontend Developer<br />Web Developer<br />Software Developer</p>
                    <p className="hero-personal-intro">สวัสดีค่ะ ฉันชื่อ Earn สนใจการออกแบบ<br />การพัฒนาเว็บ แอปมือถือ และระบบ IoT</p>
                    <div className="scrapbook-hero-actions">
                        <a className="hero-cta" href="#home-projects">View My Projects <Icon icon="mdi:arrow-right" aria-hidden="true" /></a>
                        <button className="hero-preview-button" type="button" aria-expanded={profileRunning} aria-controls="hero-profile-preview" aria-label={profileRunning ? "Close profile preview" : "Run profile"} onClick={() => setProfileRunning(!profileRunning)}><Icon icon="mdi:code-braces" aria-hidden="true" />{profileRunning ? "Close preview" : "Meet Earn"}</button>
                    </div>
                    <div className="hero-socials" aria-label="Social links">
                        <a href="https://github.com/natthaporn47" target="_blank" rel="noreferrer" aria-label="GitHub" title="GitHub"><Icon icon="cib:github" aria-hidden="true" /></a>
                        <a href="mailto:naththaphrnh@gmail.com" aria-label="Email Nattaporn" title="Email Nattaporn"><Icon icon="mdi:email-outline" aria-hidden="true" /></a>
                        <Link to="/contact" aria-label="Contact" title="Contact"><Icon icon="mdi:account-heart-outline" aria-hidden="true" /></Link>
                    </div>
                </div>
                <div ref={scene} className="hero-scene" aria-label="Creative workspace illustration">
                    <div className="hero-code-paper" aria-hidden="true"><div><i /><i /><i /><span>earn.js</span></div><pre><span>const</span> developer = {'{'}<br />  name: <em>"Nattaporn"</em>,<br />  passion: [<br />    <em>"Web"</em>,<br />    <em>"Mobile"</em>,<br />    <em>"IoT"</em><br />  ]<br />{'}'};<br /><br /><b>{"// Keep learning."}<br />{"// Keep creating."}</b></pre></div>
                    <p className="hero-speech-note">Let's build<br />something<br /><strong>amazing!</strong></p>
                    <img className="hero-character" src={`${process.env.PUBLIC_URL}/images/earn-workspace-soft.png`} alt="Illustration of Nattaporn in a white dress working at a laptop" width="1024" height="1536" fetchPriority="high" />
                    <div className="hero-interest-badges" aria-label="Areas of interest">{interests.map((item, index) => <button key={item.label} className={`interest-badge badge-${index}`} type="button" aria-pressed={activeInterest === index} onClick={() => setActiveInterest(index)} title={item.focus}><Icon icon={item.icon} aria-hidden="true" />{item.label}</button>)}</div>
                    <span className="scrapbook-sun" aria-hidden="true"><Icon icon="mdi:white-balance-sunny" /></span>
                    <span className="scrapbook-code-sticker" aria-hidden="true"><Icon icon="mdi:code-tags" /></span>
                    <div className="hero-learning-note"><strong>Currently learning...</strong><span>React / JavaScript</span><span>IoT / Cloud Computing</span></div>
                    <div className="hero-interest-note" aria-live="polite"><strong>{interest.focus}</strong><span>{interest.tools}</span></div>
                </div>
                {profileRunning && <div className="hero-profile-preview" id="hero-profile-preview" role="status">
                    <span className="preview-command">$ node earn.js</span>
                    <strong><Icon icon="mdi:check-circle-outline" aria-hidden="true" /> Hello, I'm Earn!</strong>
                    <dl><div><dt>Name</dt><dd>Nattaporn Wangsuk</dd></div><div><dt>Focus</dt><dd>{interest.focus}</dd></div><div><dt>Toolkit</dt><dd>{interest.tools}</dd></div></dl>
                    <Link to="/about">More about me <Icon icon="mdi:arrow-top-right" aria-hidden="true" /></Link>
                </div>}
                <a className="hero-scroll-note" href="#home-about"><Icon icon="mdi:mouse" aria-hidden="true" /><span>Scroll Down</span><Icon icon="mdi:chevron-down" aria-hidden="true" /></a>
            </section>
        </div>
    );
}

export default Hero;
