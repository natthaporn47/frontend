import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { projects } from "../data/projects";
import { displaySkillIcons, presentedSkillGroups } from "../data/skillPresentation";
import ProjectGallery from "../components/ProjectGallery";
import BouncyText from "../components/BouncyText";
import "../components/ProjectPreview.css";

const skillIcons = Object.fromEntries(presentedSkillGroups.flatMap(group => group.icons));

export default function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find(item => item.id === projectId);
  if (!project) return <main className="project-page detail-paper"><h1>Project Not Found</h1><Link className="paper-button" to="/projects">Back to Projects <Icon icon="mdi:arrow-left" /></Link></main>;
  return <main className={`project-page project-showcase detail-paper ${project.color}`}>
    <Link className="project-back" to="/projects"><Icon icon="mdi:arrow-left" /> Back to Projects</Link>
    <header className="project-showcase-heading">
      <div className="project-showcase-copy"><div className="project-showcase-meta" data-reveal-delay="120"><span>{String(projects.indexOf(project) + 1).padStart(2, "0")}</span><span>{project.category}</span></div><h1 data-reveal-delay="240"><BouncyText text={project.title} /></h1><p data-reveal-delay="340">{project.description}</p></div>
      <div data-reveal-delay="200" className={project.galleryInHeader ? "project-showcase-gallery project-header-gallery" : `project-showcase-art${!project.preview ? " is-reserved" : ""}`}>
        {project.galleryInHeader ? <section aria-label="Project screenshots"><ProjectGallery key={project.id} screenshots={project.screenshots} color={project.color} compact /></section> : project.preview ? project.preview.images.map((src, index) => <img key={src} src={`${process.env.PUBLIC_URL}${src}`} alt={`${project.title} preview ${index + 1}`} />) : <span role="img" aria-label="Reserved space for actual boat project image" />}
      </div>
    </header>
    <dl className="project-showcase-facts home-reveal" data-reveal-delay="440">
      <div><Icon icon="reicon:calendar-days" aria-hidden="true" /><dt>ปีที่พัฒนา</dt><dd>พ.ศ. {project.id === "agricultural-spraying" ? "2569" : "2568"}</dd></div>
      <div><Icon icon={project.id === "hungryhub" ? "famicons:fast-food-outline" : project.icon} aria-hidden="true" /><dt>ประเภทโปรเจค</dt><dd>{project.category}</dd></div>
      <div><Icon icon="bi:person" aria-hidden="true" /><dt>บทบาทของฉัน</dt><dd><ul className="project-role-list">{project.myWork.split("\n").map(role => <li key={role}>{role}</li>)}</ul></dd></div>
    </dl>
    <section className="project-showcase-technologies home-reveal" data-reveal-delay="540" aria-label="Project technologies"><div className="project-stack">{project.tags.map(([label, icon]) => <div key={label} data-technology={label}><Icon icon={displaySkillIcons[label] || skillIcons[label === "React.js" ? "React" : label] || icon} aria-hidden="true" /><strong>{label}</strong></div>)}</div></section>
    {!project.galleryInHeader && project.screenshots?.length > 0 && <section className="project-showcase-gallery home-reveal" aria-label="Project screenshots"><ProjectGallery key={project.id} screenshots={project.screenshots} color={project.color} compact /></section>}
    <footer className="project-page-footer"><a className="paper-button project-source-link" href={project.githubUrl} target="_blank" rel="noopener noreferrer"><Icon icon="akar-icons:github-fill" aria-hidden="true" /> View Source Code</a><Link className="paper-button" to="/contact">Let's Connect <Icon icon="mdi:arrow-right" /></Link></footer>
  </main>;
}
