import BouncyText from "./BouncyText";
import TextRepel from "./TextRepel";
import LetterCascade from "./LetterCascade";
import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { presentedSkillGroups, displaySkillIcons } from "../data/skillPresentation";
import ProjectDetails from "./ProjectDetails";
import { ContactMessageDialog } from "../pages/Contact";
import lineIcon from "../data/lineIcon.json";
import hobbyIcons from "../data/hobbyIcons.json";
import requestedHobbyIcons from "../data/requestedHobbyIcons.json";
import projectArrowIcon from "../data/projectArrowIcon.json";

const hobbyIcon = name => requestedHobbyIcons[name] || ({ ...hobbyIcons.icons[name], width: hobbyIcons.width, height: hobbyIcons.height });

const filters = [
  ["All", "All"], ["Frontend", "frontend"], ["Backend", "backend"],
  ["Mobile", "mobile"], ["Tools & Platforms", "tools"], ["IoT & Hardware", "iot"],
];
const projectLabels = { hungryhub: "HungryHub", vanvan: "VanVan", "agricultural-spraying": "Automatic Spraying Boat System" };
const projectCategories = { hungryhub: "Mobile Application", vanvan: "Web Application", "agricultural-spraying": "Software & Hardware" };
const homeProjectImages = {
  hungryhub: ["/images/projects/hungryhub/home.png", "/images/projects/hungryhub/recipe-details.png"],
  vanvan: ["/images/projects/vanvan/latest/3.png"],
  "agricultural-spraying": [projects.find(project => project.id === "agricultural-spraying").cardImage],
};
const aboutFacts = [
  { label: "Education", icon: "stash:graduation-cap", text: "ปริญญาตรี มจพ.", detail: "เทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์" },
  { label: "Birthday", icon: "heroicons:cake", text: "25 กรกฎาคม 2547" },
  { label: "Location", icon: "boxicons:location-alt-2", text: "Bangkok, Thailand" },
];
const homeInterests = [
  { title: "ดูหนัง", icon: "emojione:clapper-board" },
  { title: "ฟังเพลง", icon: "streamline-freehand:music-note-1" },
  { title: "เล่นเกม", icon: "famicons:game-controller-outline" },
  { title: "ท่องเที่ยว", icon: "emojione-monotone:small-airplane" },
];

export default function HomeSections() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [messageOpen, setMessageOpen] = useState(false);
  const skillsRail = useRef(null);
  const [railEdges, setRailEdges] = useState({ start: true, end: false });
  const updateRailEdges = () => {
    const rail = skillsRail.current;
    if (rail) setRailEdges({ start: rail.scrollLeft <= 2, end: rail.scrollLeft + rail.clientWidth >= rail.scrollWidth - 2 });
  };
  useEffect(() => {
    skillsRail.current.scrollLeft = 0;
    updateRailEdges();
    const observer = typeof ResizeObserver !== "undefined" ? new ResizeObserver(updateRailEdges) : null;
    observer?.observe(skillsRail.current);
    return () => observer?.disconnect();
  }, [filter]);
  const moveSkills = direction => {
    skillsRail.current.scrollBy({ left: direction * skillsRail.current.clientWidth * .7, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" });
  };
  const selectedItems = presentedSkillGroups.filter(group => filter === "All" || group.area === filter).flatMap(group => group.icons);
  const technologies = [...new Map(selectedItems.map(item => [item[0], item])).values()];
  const featuredOrder = ["HTML", "CSS", "JavaScript", "React", "Node.js", "Flutter", "Dart", "PHP"];
  if (filter === "All") technologies.sort((a, b) => {
    const rank = label => featuredOrder.includes(label) ? featuredOrder.indexOf(label) : featuredOrder.length;
    return rank(a[0]) - rank(b[0]);
  });
  const openProject = (event, project) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setSelectedProject(project);
  };
  const filterLabel = filters.find(([, id]) => id === filter)[0];

  return <>
    <section className="home-section home-about" id="home-about" aria-labelledby="home-about-title">
      <div className="home-section-inner home-about-layout">
        <div className="home-about-art home-reveal" data-reveal-delay="0">
          <figure className="portrait-polaroid home-about-photo"><div className="home-about-photo-window"><img src={`${process.env.PUBLIC_URL}/images/earn-about-white-clean-v2.png`} alt="ภาพเอิร์นในชุดสีขาว" width="1008" height="1561" loading="lazy" /></div><figcaption>Nice to meet you! <Icon icon="openmoji:paw-prints" aria-hidden="true" /></figcaption></figure>
          <Icon className="home-about-spark animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" />
        </div>
        <div className="home-about-copy home-reveal" data-reveal-delay="120">
          <h2 id="home-about-title"><BouncyText text="About Me" /> <Icon className="animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" /></h2>
          <p><strong className="home-thai-name"><LetterCascade text="ณัฐฐาภรณ์ หวังสุข" /></strong></p>
          <p>สนใจการพัฒนาเว็บไซต์ แอปพลิเคชัน ชอบเรียนรู้สิ่งใหม่ ๆ และนำความรู้มาลงมือทำ เพื่อสร้างผลงานที่ใช้งานได้จริง</p>
          <dl className="scrapbook-about-facts">{aboutFacts.map(fact => <div key={fact.label}><Icon icon={fact.icon} aria-hidden="true" /><dt>{fact.label}</dt><dd>{fact.href ? <a href={fact.href}>{fact.text}</a> : fact.text}{fact.detail && <small>{fact.detail}</small>}</dd></div>)}</dl>
          <Link className="home-more-link" to="/about">More about me <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link>
        </div>
        <aside className="home-about-interests home-reveal" data-reveal-delay="240" aria-labelledby="home-interests-title">
          <header className="home-hobbies-heading"><Icon icon={hobbyIcon("fluent-emoji-high-contrast:puzzle-piece")} aria-hidden="true" /><div><h3 id="home-interests-title">Hobbies</h3><p>สิ่งที่ฉันชอบในเวลาว่าง ♡</p></div></header>
          <Icon className="home-hobbies-plane" icon={hobbyIcon("streamline-freehand:send-email-paper-plane-1")} aria-hidden="true" />
          <ul>{homeInterests.map(interest => <li key={interest.title}><Icon icon={hobbyIcon(interest.icon)} aria-hidden="true" /><h4>{interest.title}</h4></li>)}</ul>
        </aside>
      </div>
    </section>

    <section className="home-section home-skills" id="home-skills" aria-labelledby="home-skills-title">
      <div className="home-section-inner">
        <header className="home-section-heading home-reveal" data-reveal-delay="0"><div><h2 id="home-skills-title"><BouncyText text="My Skills & Tools" /> <Icon className="animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" /></h2><p>เครื่องมือและเทคโนโลยีที่ใช้ในการพัฒนาโปรเจค</p></div><Link className="home-more-link" to="/skills">All skills &amp; tools <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link></header>
        <div className="scrapbook-filters" role="group" aria-label="Filter home skills">{filters.map(([label, id]) => <button key={id} type="button" aria-pressed={filter === id} onClick={() => setFilter(id)}>{label}</button>)}</div>
        <div className="home-skills-carousel" data-reveal-delay="240">
          <button className="skills-rail-arrow" type="button" aria-label="Previous skills" title="Previous skills" disabled={railEdges.start} onClick={() => moveSkills(-1)}><Icon icon="mdi:arrow-left" aria-hidden="true" /></button>
          <div ref={skillsRail} onScroll={updateRailEdges} className="scrapbook-skill-grid" aria-label={`${filterLabel} skills`}>{technologies.map(([label, icon]) => <Link key={label} to="/skills" state={{ skillLabel: label }} className="scrapbook-skill" title={label}>{label === "Arduino uno" ? <img src={`${process.env.PUBLIC_URL}/images/skills-icons8-68008.png`} alt="" width="100" height="100" /> : <Icon icon={displaySkillIcons[label] || icon} aria-hidden="true" />}<span>{label}</span></Link>)}</div>
          <button className="skills-rail-arrow" type="button" aria-label="Next skills" title="Next skills" disabled={railEdges.end} onClick={() => moveSkills(1)}><Icon icon="mdi:arrow-right" aria-hidden="true" /></button>
        </div>
        <p className="skill-filter-count" role="status"><span className="home-skill-count-accessible">{technologies.length} technologies / {filterLabel}</span><Icon icon="openmoji:paw-prints" aria-hidden="true" /></p>
      </div>
    </section>

    <section className="home-section home-work" id="home-projects" aria-labelledby="home-work-title">
      <div className="home-section-inner">
        <header className="home-section-heading home-reveal" data-reveal-delay="0"><div><h2 id="home-work-title"><BouncyText text="My Projects" /> <Icon className="animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" /></h2><p>โปรเจคที่ได้พัฒนาและเรียนรู้จากการลงมือทำ</p></div><Link className="home-more-link peach-link" to="/projects">View All Projects <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link></header>
        <div className="home-work-grid">{projects.map((project, index) => <article className="home-project-item home-reveal" data-reveal-delay={120 + index * 120} key={project.id}>
          <Link className={`home-work-preview ${project.color}`} to={`/projects/${project.id}`} aria-label={`View ${projectLabels[project.id]} details`} onClick={event => openProject(event, project)}>
            <div className={`home-project-art ${project.cardImage ? "project-preview-model" : project.id === "hungryhub" ? "project-preview-mobile" : "project-preview-desktop"}${!homeProjectImages[project.id] ? " is-reserved" : ""}`}>
              {homeProjectImages[project.id] ? homeProjectImages[project.id].map((src, imageIndex) => <img key={src} src={`${process.env.PUBLIC_URL}${src}`} alt={project.cardImage ? `${project.title} boat model` : `${projectLabels[project.id]} screenshot ${imageIndex + 1}`} loading="lazy" />) : <span role="img" aria-label="Reserved space for actual boat project image" />}
            </div>
            <div className="home-work-copy">
              <div className="home-project-meta"><span className="project-sticker-number">{String(index + 1).padStart(2, "0")}</span>{project.status ? <span className="home-project-labels"><span className="home-work-category">{projectCategories[project.id]}</span><span className="home-project-status">{project.status}</span></span> : <span className="home-work-category">{projectCategories[project.id]}</span>}</div>
              <h3>{projectLabels[project.id]}</h3>
              <p>{project.cardDescription || project.description}</p>
              <div className="home-work-tags">{project.tags.map(([label]) => <span key={label}>{label === "React.js" ? "React" : label}</span>)}</div>
            </div>
            <div className="home-work-footer"><span className="home-work-cta" title={`View ${projectLabels[project.id]} details`} aria-hidden="true"><Icon icon={projectArrowIcon} /></span></div>
          </Link>
        </article>)}</div>
      </div>
    </section>

    <section className="home-section home-connect" id="home-contact" aria-labelledby="home-contact-title">
      <div className="home-connect-doodles" aria-hidden="true">
        <span className="connect-plane-decoration"><svg className="connect-plane-trail" viewBox="0 0 104 64" fill="none"><path d="M 4 55 C 28 61 57 42 42 31 C 28 21 26 45 48 42 Q 63 40 74 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" /></svg><Icon className="connect-paper-plane" icon="solar:plane-broken" /></span>
      </div>
      <div className="home-section-inner home-connect-layout home-reveal" data-reveal-delay="0">
        <header><h2 id="home-contact-title"><BouncyText text="Let's Connect" /> <Icon className="animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" /></h2><p>ยินดีติดต่อ พูดคุย หรือแลกเปลี่ยนไอเดียเสมอค่ะ</p></header>
        <div className="home-contact-links">
          <button className="home-email-card" type="button" aria-haspopup="dialog" aria-expanded={messageOpen} onClick={() => setMessageOpen(true)}><Icon icon="clarity:email-outline-badged" aria-hidden="true" /><span><small>Email</small>naththaphrnh@gmail.com</span></button>
          <a href="tel:+66624702688"><Icon icon="carbon:phone-voice" aria-hidden="true" /><span><small>Phone</small>062 470 2688</span></a>
          <a href="https://line.me/ti/p/~earn25477" target="_blank" rel="noopener noreferrer"><Icon icon={lineIcon} aria-hidden="true" /><span><small>LINE ID</small>earn25477</span></a>
        </div>
        <div className="home-connect-socials" aria-label="Contact social links">
          <a href="https://github.com/natthaporn47" target="_blank" rel="noopener noreferrer" aria-label="Earn on GitHub" title="GitHub"><Icon icon="akar-icons:github-fill" aria-hidden="true" /></a>
          <a href="https://line.me/ti/p/~earn25477" target="_blank" rel="noopener noreferrer" aria-label="Earn on LINE" title="LINE: earn25477"><Icon icon={lineIcon} aria-hidden="true" /></a>
          <button type="button" aria-label="Email Earn" title="Email" aria-haspopup="dialog" aria-expanded={messageOpen} onClick={() => setMessageOpen(true)}><Icon icon="clarity:email-outline-badged" aria-hidden="true" /></button>
        </div>
      </div>
    </section>
    <footer className="home-footer" data-reveal-delay="120"><TextRepel text="Natthaporn Wangsuk" /></footer>
    {selectedProject && <ProjectDetails project={selectedProject} onDismiss={() => setSelectedProject(null)} />}
    {messageOpen && <ContactMessageDialog onDismiss={() => setMessageOpen(false)} />}
  </>;
}
