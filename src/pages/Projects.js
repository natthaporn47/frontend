import { Icon } from "@iconify/react";
import "./Projects.css";
import BouncyText from "../components/BouncyText";
import { Link } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectVisual from "../components/ProjectVisual";

function ProjectCover({ project }) {
  if (project.cardImage) return <figure className="project-cover project-cover-model"><img src={`${process.env.PUBLIC_URL}${project.cardImage}`} alt={`${project.title} boat model`} loading="lazy" /></figure>;
  if (!project.preview?.images?.length) return <ProjectVisual project={project} />;
  return <figure className={`project-cover project-cover-${project.preview.format}`}>
    {project.preview.images.map((src, index) => <img key={src} src={`${process.env.PUBLIC_URL}${src}`} alt={`${project.title}: ${project.preview.format === "mobile" ? `Application screen ${index + 1}` : "Admin Dashboard"}`} loading="lazy" />)}
  </figure>;
}

function Projects() {
  return <main className="projects-page projects-reference detail-paper">
    <div className="projects-inner">
      <header className="projects-heading" data-reveal-delay="0">
        <div><h1><BouncyText text="My Projects" /> <Icon className="animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" /></h1><p>โปรเจคที่ฉันพัฒนาและได้เรียนรู้ระหว่างการศึกษา</p></div>
        <span className="projects-bee-decoration" aria-hidden="true"><svg className="projects-bee-trail" viewBox="0 0 110 64" fill="none"><path d="M 4 54 C 30 62 60 45 45 32 C 30 18 23 44 48 42 Q 66 42 76 22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="5 6" strokeLinecap="round" /></svg><Icon className="projects-heading-bee" icon="mdi:bee-flower" /></span>
      </header>
      <section className="project-grid" aria-label="Project portfolio">
        {projects.map((project, index) => <article className={`project-card project-${project.color}`} data-reveal-delay={120 + index * 120} key={project.id}>
          <div className="project-card-body">
            <div className="project-card-media">
              <ProjectCover project={project} />
              <span className="project-category">{project.id === "agricultural-spraying" ? "2569" : "2568"}</span>
            </div>
            <div className="project-card-meta"><div className="project-card-number">งาน {projects.indexOf(project) + 1}<span /></div>{project.status && <span className="project-card-status">{project.status}</span>}</div>
            <h2>{project.title}</h2>
            <p className="project-description">{project.cardDescription || project.description}</p>
            <div className="project-tech"><div className="project-tags">
              {project.tags.map(([label]) => <span key={label} data-technology={label}>{label === "React.js" ? "React" : label}</span>)}
            </div></div>
            <div className="project-card-actions">
              <Link className="project-details-button" to={`/projects/${project.id}`} aria-label={`View ${project.title} details`}>View Details <Icon icon="mdi:arrow-right" aria-hidden="true" /></Link>
              <a className="project-card-sticker" href={project.githubUrl} target="_blank" rel="noopener noreferrer" aria-label={`${project.title} on GitHub`} title={`${project.title} on GitHub`}><Icon icon="akar-icons:github-fill" aria-hidden="true" /></a>
            </div>
          </div>
        </article>)}
      </section>
      <a className="projects-github" href="https://github.com/natthaporn47" target="_blank" rel="noreferrer"><Icon icon="mdi:github" aria-hidden="true" /><span>More projects on GitHub</span><Icon icon="mdi:arrow-top-right" aria-hidden="true" /></a>
    </div>
  </main>;
}

export default Projects;
