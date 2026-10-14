import "./Hero.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import lineIcon from "../data/lineIcon.json";
import { useState } from "react";
import { ContactMessageDialog } from "../pages/Contact";
import TextRepel from "../components/TextRepel";
import TextMorph from "../components/TextMorph";
import LetterCascade from "../components/LetterCascade";
import paperPlaneIcon from "../data/paperPlaneIcon.json";

const developerRoles = ["Web Developer", "Mobile Developer"];

export default function Hero() {
  const [messageOpen, setMessageOpen] = useState(false);
  return <div className="home-page">
    <section className="hero scrapbook-hero" aria-labelledby="home-title">
      <div className="hero-scene" data-reveal-delay="120" aria-hidden="true">
        <div className="hero-editor">
          <div className="hero-editor-bar"><i /><i /><i /><span>about-me.js</span></div>
          <pre><code><span className="code-keyword">const</span>{' developer = {\n'}{'  name: '}<span className="code-string">"Natthaporn"</span>{',\n  interests: [\n'}<span className="code-string">{'    "Web",\n    "Mobile",\n    "IoT"'}</span>{'\n  ],\n  learning: '}<span className="code-keyword">true</span>{'\n};\n\n'}<span className="code-comment">{'// Keep learning.'}</span>{'\n'}<span className="code-comment">{'// Keep creating.'}</span></code></pre>
        </div>
        <img className="hero-character" src={`${process.env.PUBLIC_URL}/images/earn-workspace-reference-pose-v3.png`} alt="" width="1199" height="1312" fetchPriority="high" />
        <span className="hero-handwritten">Let's<br />Build Something<br />Amazing!</span>
        <div className="hero-topic-labels"><span>Mobile</span><span>Web</span><span>IoT</span><span>Frontend</span></div>
        <span className="hero-idea-note">Good Ideas<br />Take Time<br />and Practice<Icon icon="mdi:heart-outline" /></span>
        <span className="hero-plane-decoration"><svg className="hero-plane-trail" viewBox="0 0 100 72" fill="none"><path d="M 4 65 C 26 70 52 54 40 42 C 28 30 20 52 43 51 Q 62 50 76 30" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" strokeLinecap="round" /></svg><Icon className="hero-plane" icon={paperPlaneIcon} /></span>
        <Icon className="hero-spark animated-sparkle" icon="mdi:creation-outline" />
      </div>
      <div className="hero-text" data-reveal-delay="0">
        <p className="hello">Hi, I'm <Icon className="animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" /></p>
        <h1 id="home-title" aria-label="Natthaporn Wangsuk"><span><TextRepel text="Natthaporn" /></span><span><TextRepel text="Wangsuk" /></span></h1>
        <p className="hero-thai-name"><LetterCascade text="ณัฐฐาภรณ์ หวังสุข" /></p>
        <h2 className="hero-study-program">สาขาเทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์ แขนงคอมพิวเตอร์</h2>
        <div className="hero-focus-list"><TextMorph words={developerRoles} /></div>
        <p className="hero-personal-intro">นักศึกษาที่สนใจการพัฒนาเว็บไซต์และแอปพลิเคชัน ชอบเรียนรู้สิ่งใหม่ ๆ และนำความรู้มาลงมือทำจริง</p>
        <div className="scrapbook-hero-actions">
          <a className="hero-cta" href="#home-projects">View My Projects <Icon icon="mdi:arrow-right" aria-hidden="true" /></a>
          <Link className="hero-about-link" to="/about"><Icon icon="bi:person" aria-hidden="true" />About Me</Link>
        </div>
        <div className="hero-socials" aria-label="Social links">
          <a href="https://github.com/natthaporn47" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub"><Icon icon="akar-icons:github-fill" aria-hidden="true" /></a>
          <a href="https://line.me/ti/p/~earn25477" target="_blank" rel="noopener noreferrer" aria-label="LINE" title="LINE: earn25477"><Icon icon={lineIcon} aria-hidden="true" /></a>
          <button type="button" aria-label="Email Natthaporn" title="Email" aria-haspopup="dialog" aria-expanded={messageOpen} onClick={() => setMessageOpen(true)}><Icon icon="clarity:email-outline-badged" aria-hidden="true" /></button>
        </div>
      </div>
      <a className="hero-scroll-note" href="#home-about" aria-label="Scroll to About Me"><Icon icon="mdi:chevron-down" aria-hidden="true" /><span>Scroll Down</span></a>
    </section>
    {messageOpen && <ContactMessageDialog onDismiss={() => setMessageOpen(false)} />}
  </div>;
}
