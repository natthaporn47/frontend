import { useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import { skillGroups, tools } from "../data/skills";
import ProjectDetails from "./ProjectDetails";

const filters = ["All", "Frontend", "Backend", "Mobile", "IoT", "Tools"];
const learning = [
  { icon: "mdi:magnify", title: "Understand", description: "ทำความเข้าใจความต้องการของผู้ใช้และระบบ" },
  { icon: "mdi:pencil-ruler-outline", title: "Design", description: "ออกแบบหน้าจอและวางโครงสร้างให้ใช้งานง่าย" },
  { icon: "mdi:code-tags", title: "Build & Learn", description: "ลงมือพัฒนา เชื่อมต่อข้อมูล และเรียนรู้จากผลงาน" },
];

export default function HomeSections() {
  const [filter, setFilter] = useState("All");
  const [selectedProject, setSelectedProject] = useState(null);
  const selectedItems = filter === "Tools" ? tools : skillGroups.filter((group, index) => filter === "All" || index === filters.indexOf(filter) - 1).flatMap(group => group.icons);
  const technologies = [...new Map(selectedItems.map(item => [item[0], item])).values()];
  const openProject = (event, project) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    setSelectedProject(project);
  };

  return <>
    <section className="home-section home-about" id="home-about" aria-labelledby="home-about-title">
      <div className="home-section-inner home-about-layout">
        <div className="home-about-art home-reveal">
          <div className="scrapbook-photo"><img className="home-about-image" src={`${process.env.PUBLIC_URL}/images/earn-workspace-blue.png`} alt="ภาพประกอบมุมทำงานของนักพัฒนา" width="1536" height="1024" loading="lazy" /><span>little ideas, big possibilities</span></div>
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
    </section>

    <section className="home-section home-skills" id="home-skills" aria-labelledby="home-skills-title">
      <div className="home-section-inner">
        <header className="home-section-heading home-reveal"><div><h2 id="home-skills-title">My Skills &amp; Tools</h2><p>เครื่องมือที่ใช้สร้างผลงาน และสิ่งที่เรียนรู้อยู่เสมอ</p></div><Link className="home-more-link" to="/skills">All skills &amp; tools <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link></header>
        <div className="scrapbook-filters" role="group" aria-label="Filter home skills">{filters.map(option => <button key={option} type="button" aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>)}</div>
        <div className="scrapbook-skill-grid" key={filter} aria-label={`${filter} skills`}>{technologies.map(([label, icon]) => <Link key={label} to="/skills" state={{ skillLabel: label }} className="scrapbook-skill" title={label}><Icon icon={icon} aria-hidden="true" /><span>{label}</span></Link>)}</div>
        <p className="skill-filter-count" role="status">{technologies.length} technologies / {filter}</p>
      </div>
    </section>

    <section className="home-section home-work" id="home-projects" aria-labelledby="home-work-title">
      <div className="home-section-inner">
        <header className="home-section-heading home-reveal"><div><h2 id="home-work-title">My Projects <Icon icon="mdi:creation-outline" aria-hidden="true" /></h2><p>ผลงานที่ได้เรียนรู้ ออกแบบ และลงมือพัฒนา</p></div><Link className="home-more-link peach-link" to="/projects">All projects <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link></header>
        <div className="home-work-grid">{projects.map((project, index) => <Link className={`home-work-preview ${project.color} home-reveal`} key={project.id} to="/projects" state={{ projectId: project.id }} onClick={event => openProject(event, project)}>
          <span className="project-sticker-number">0{index + 1}</span>
          <div className="home-work-copy"><h3>{project.title}</h3><span className="home-work-category">{project.category}</span><p>{project.description}</p><div className="home-work-tags">{project.tags.slice(0, 4).map(([label]) => <span key={label}>{label}</span>)}</div><span className="home-work-cta"><span>Project details</span><Icon icon="mdi:arrow-right" aria-hidden="true" /></span></div>
          <Icon className="project-sticker-icon" icon={project.icon} aria-hidden="true" />
        </Link>)}</div>
      </div>
    </section>

    <section className="home-section home-journey" id="home-journey" aria-labelledby="home-journey-title">
      <div className="home-section-inner">
        <header className="home-section-heading home-reveal"><div><h2 id="home-journey-title"><Icon icon="mdi:github" aria-hidden="true" /> My Development Journey</h2><p>เรียนรู้จากทุกขั้นตอน ไม่ใช่แค่ผลลัพธ์สุดท้าย</p></div><a className="home-more-link" href="https://github.com/natthaporn47" target="_blank" rel="noreferrer">My GitHub <Icon icon="mdi:arrow-top-right" aria-hidden="true" /></a></header>
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
    {selectedProject && <ProjectDetails project={selectedProject} onDismiss={() => setSelectedProject(null)} />}
  </>;
}
