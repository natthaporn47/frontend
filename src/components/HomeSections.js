import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { skillGroups, tools } from "../data/skills";
import ProjectDetails from "./ProjectDetails";

const filters = ["All", "Frontend", "Mobile", "Backend", "Tools", "IoT"];
const groupIndexes = { Frontend: 0, Backend: 1, Mobile: 2, IoT: 3 };
const projectLabels = { hungryhub: "HungryHub", vanvan: "VanVan", "agricultural-spraying": "Agricultural Spraying Boat" };
const learning = [
  { icon: "mdi:magnify", title: "Understand", description: "ทำความเข้าใจความต้องการของผู้ใช้และระบบ" },
  { icon: "mdi:pencil-ruler-outline", title: "Design", description: "ออกแบบหน้าจอและวางโครงสร้างให้ใช้งานง่าย" },
  { icon: "mdi:code-tags", title: "Build & Learn", description: "ลงมือพัฒนา เชื่อมต่อข้อมูล และเรียนรู้จากผลงาน" },
];

export default function HomeSections() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const [selectedScreenshot, setSelectedScreenshot] = useState(0);
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
  const selectedItems = filter === "All" ? [...skillGroups.flatMap(group => group.icons), ...tools] : filter === "Tools" ? tools : skillGroups[groupIndexes[filter]].icons;
  const technologies = [...new Map(selectedItems.map(item => [item[0], item])).values()];
  const featuredOrder = ["HTML", "CSS", "JavaScript", "React.js", "Flutter", "Node.js", "Firebase", "Visual Studio Code", "Git"];
  if (filter === "All") technologies.sort((a, b) => {
    const rank = label => featuredOrder.includes(label) ? featuredOrder.indexOf(label) : featuredOrder.length;
    return rank(a[0]) - rank(b[0]);
  });
  const openProject = (event, project) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setSelectedScreenshot(0);
    setSelectedProject(project);
  };

  const aboutSection = <section className="home-section home-about" id="home-about" aria-labelledby="home-about-title">
      <div className="home-section-inner home-about-layout">
        <div className="home-about-art home-reveal">
          <figure className="portrait-polaroid home-about-photo"><img src={`${process.env.PUBLIC_URL}/images/earn-white-cartoon.png`} alt="Cartoon portrait of Earn in a white dress" width="1024" height="1536" loading="lazy" /><figcaption>Nice to meet you!</figcaption></figure>
          <Icon className="photo-paperclip" icon="mdi:paperclip" aria-hidden="true" />
          <span className="home-art-note">Always learning,<br />always creating.</span>
        </div>
        <div className="home-about-copy home-reveal">
          <h2 id="home-about-title">About Me <Icon icon="mdi:heart-outline" aria-hidden="true" /></h2>
          <p>สวัสดีค่ะ ฉันชื่อ <strong>Nattaporn Wangsuk (Earn)</strong><br />เป็นนักศึกษาวิศวกรรมคอมพิวเตอร์ที่สนใจการออกแบบและพัฒนาเว็บ แอปมือถือ และระบบ IoT</p>
          <p>ฉันชอบเปลี่ยนไอเดียให้เป็นสิ่งที่ใช้งานได้จริง ใส่ใจรายละเอียด และพร้อมเรียนรู้สิ่งใหม่ผ่านการลงมือทำ</p>
          <dl className="scrapbook-about-facts"><div><Icon icon="mdi:school-outline" aria-hidden="true" /><dt>Education</dt><dd>Computer Engineering, KMUTNB</dd></div><div><Icon icon="mdi:book-open-variant" aria-hidden="true" /><dt>GPA</dt><dd>2.80</dd></div><div><Icon icon="mdi:map-marker-outline" aria-hidden="true" /><dt>Location</dt><dd>Bangkok, Thailand</dd></div></dl>
          <Link className="home-more-link" to="/about">More about me <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link>
        </div>
      </div>
      <Icon className="section-paperplane" icon="mdi:send-outline" aria-hidden="true" />
    </section>;

  return <>
    {aboutSection}
    <section className="home-section home-skills" id="home-skills" aria-labelledby="home-skills-title">
      <div className="home-section-inner">
        <header className="home-section-heading home-reveal"><div><h2 id="home-skills-title">My Skills &amp; Tools</h2><p>เครื่องมือที่ใช้สร้างผลงาน และสิ่งที่เรียนรู้อยู่เสมอ</p></div><Link className="home-more-link" to="/skills">All skills &amp; tools <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link></header>
        <div className="scrapbook-filters" role="group" aria-label="Filter home skills">{filters.map(option => <button key={option} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>)}</div>
        <div className="home-skills-carousel"><button className="skills-rail-arrow" type="button" aria-label="Previous skills" title="Previous skills" disabled={railEdges.start} onClick={() => moveSkills(-1)}><Icon icon="mdi:arrow-left" /></button><div ref={skillsRail} onScroll={updateRailEdges} className="scrapbook-skill-grid" aria-label={`${filter} skills`}>{technologies.map(([label, icon]) => <Link key={label} to="/skills" state={{ skillLabel: label }} className="scrapbook-skill" title={label}><Icon icon={icon} aria-hidden="true" /><span>{label}</span></Link>)}</div><button className="skills-rail-arrow" type="button" aria-label="Next skills" title="Next skills" disabled={railEdges.end} onClick={() => moveSkills(1)}><Icon icon="mdi:arrow-right" /></button></div>
        <p className="skill-filter-count" role="status">{technologies.length} technologies / {filter}</p>
      </div>
    </section>

    <section className="home-section home-work" id="home-projects" aria-labelledby="home-work-title">
      <div className="home-section-inner">
        <header className="home-section-heading home-reveal"><div><h2 id="home-work-title">My Projects <Icon icon="mdi:creation-outline" aria-hidden="true" /></h2><p>ผลงานที่ได้เรียนรู้ ออกแบบ และลงมือพัฒนา</p></div><Link className="home-more-link peach-link" to="/projects">All projects <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link></header>
        <div className="home-work-grid">{projects.map((project, index) => <article className="home-project-item home-reveal" key={project.id}><Link className={`home-work-preview ${project.color}`} to="/projects" state={{ projectId: project.id }} onClick={event => openProject(event, project)}>
          <span className="project-sticker-number">0{index + 1}</span>
          <div className="home-work-copy"><h3>{projectLabels[project.id]}</h3><span className="home-work-category">{project.category}</span><p>{project.description}</p><div className="home-work-tags">{project.tags.map(([label]) => <span key={label}>{label}</span>)}</div><span className="home-work-cta"><span>Project details</span><Icon icon="mdi:arrow-right" aria-hidden="true" /></span></div>
          <div className={`home-project-art ${project.preview ? `project-preview-${project.preview.format}` : ""}`}>{project.preview ? project.preview.images.map((src, imageIndex) => <img key={src} src={`${process.env.PUBLIC_URL}${src}`} alt={`${projectLabels[project.id]} screenshot ${imageIndex + 1}`} loading="lazy" />) : project.screenshots?.length ? <img src={`${process.env.PUBLIC_URL}${project.screenshots[0].src}`} alt={`${projectLabels[project.id]} screenshot`} loading="lazy" /> : <Icon icon={project.icon} aria-hidden="true" />}</div>
          <Icon className="home-project-pin" icon="mdi:paperclip" aria-hidden="true" />
        </Link>{project.screenshots?.length > 0 && <div className="home-project-photos"><div className="home-project-photo-heading"><span>Project Screens</span><span>{project.screenshots.length} photos</span></div><div className="home-project-photo-rail" role="group" aria-label={`${projectLabels[project.id]} screenshots`}>{project.screenshots.map((screenshot, imageIndex) => <button type="button" key={screenshot.src} title={screenshot.title} aria-label={`View ${projectLabels[project.id]} ${screenshot.title}`} onClick={() => { setSelectedScreenshot(imageIndex); setSelectedProject(project); }}><img src={`${process.env.PUBLIC_URL}${screenshot.src}`} alt="" loading="lazy" /><span>{screenshot.title}</span></button>)}</div></div>}</article>)}</div>
      </div>
    </section>

    <section className="home-section home-journey" id="home-journey" aria-labelledby="home-journey-title">
      <div className="home-section-inner">
        <header className="home-section-heading home-reveal"><div><h2 id="home-journey-title"><Icon icon="mdi:github" aria-hidden="true" /> GitHub &amp; My Journey</h2><a className="home-github-handle" href="https://github.com/natthaporn47" target="_blank" rel="noreferrer">@natthaporn47 <Icon icon="mdi:arrow-top-right" aria-hidden="true" /></a></div><div className="home-learning-summary"><h3>Currently Learning</h3><ul>{["React", "Cloud Technology", "System Design", "IoT & Embedded"].map(item => <li key={item}>{item}</li>)}</ul></div></header>
        <div className="journey-layout home-reveal"><ol className="journey-steps">{learning.map((step, index) => <li key={step.title}><span className="journey-step-icon"><Icon icon={step.icon} aria-hidden="true" /></span><div><small>0{index + 1}</small><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol><dl className="journey-facts"><div><dt>Projects</dt><dd>{projects.length}</dd></div><div><dt>Learning areas</dt><dd>{skillGroups.length}</dd></div><div><dt>Technologies</dt><dd>{new Set(skillGroups.flatMap(group => group.icons.map(([label]) => label))).size}</dd></div></dl></div>
      </div>
    </section>

    <section className="home-section home-connect" id="home-contact" aria-labelledby="home-contact-title">
      <div className="home-section-inner home-connect-layout home-reveal">
        <div><h2 id="home-contact-title">Let's Connect <Icon icon="mdi:heart-outline" aria-hidden="true" /></h2><p>ยินดีที่ได้พูดคุยและร่วมงาน<br />ในโอกาสต่อไปนะคะ</p><Link className="home-more-link" to="/contact">Contact me <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link></div>
        <div className="home-contact-links"><a href="mailto:naththaphrnh@gmail.com"><Icon icon="mdi:email-outline" aria-hidden="true" /><span><small>Email</small>naththaphrnh@gmail.com</span></a><a href="tel:+66624702688"><Icon icon="mdi:phone-outline" aria-hidden="true" /><span><small>Phone</small>062 470 2688</span></a><a href="https://github.com/natthaporn47" target="_blank" rel="noreferrer"><Icon icon="mdi:github" aria-hidden="true" /><span><small>GitHub</small>natthaporn47</span></a></div>
      </div>
    </section>
    <footer className="home-footer"><span>Nattaporn Wangsuk</span><p>Keep learning, keep creating, and keep improving.</p><a href="#home-title" aria-label="Back to introduction" title="Back to introduction"><Icon icon="mdi:arrow-up" aria-hidden="true" /></a></footer>
    {selectedProject && <ProjectDetails project={selectedProject} initialScreenshot={selectedScreenshot} onDismiss={() => setSelectedProject(null)} />}
  </>;
}
