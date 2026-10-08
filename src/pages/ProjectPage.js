import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Icon } from "@iconify/react";
import { projects } from "../data/projects";
import ProjectVisual from "../components/ProjectVisual";
import ProjectGallery from "../components/ProjectGallery";

export default function ProjectPage() {
  const { projectId } = useParams();
  const project = projects.find(item => item.id === projectId);
  const [tab, setTab] = useState("Overview");
  useEffect(() => setTab("Overview"), [projectId]);
  if (!project) return <main className="project-page detail-paper"><h1>Project Not Found</h1><Link className="paper-button" to="/projects">Back to Projects <Icon icon="mdi:arrow-left" /></Link></main>;
  const tabs = ["Overview", "My Role", "Key Features", "Tech Stack", ...(project.flow ? ["App Flow"] : []), ...(project.screenshots?.length ? ["Screenshots"] : [])];
  return <main className={`project-page detail-paper ${project.color}`}>
    <Link className="project-back" to="/projects"><Icon icon="mdi:arrow-left" /> Back to Projects</Link>
    <header className="project-page-heading home-reveal"><div className="project-title-icon"><Icon icon={project.icon} aria-hidden="true" /></div><div><h1>{project.title}</h1><p>{project.category}</p><div className="project-tags">{project.tags.map(([label, icon]) => <span key={label}><Icon icon={icon} />{label}</span>)}</div></div><ProjectVisual project={project} /></header>
    <div className="project-reading-layout home-reveal"><div className="project-page-tabs" role="tablist" aria-label="Project information">{tabs.map((label, index) => <button type="button" key={label} id={`project-tab-${index}`} role="tab" aria-selected={tab === label} aria-controls="project-tab-panel" tabIndex={tab === label ? 0 : -1} onClick={() => setTab(label)} onKeyDown={event => {
      if (["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp", "Home", "End"].includes(event.key)) {
        event.preventDefault();
        const next = event.key === "Home" ? 0 : event.key === "End" ? tabs.length - 1 : (index + (event.key === "ArrowRight" || event.key === "ArrowDown" ? 1 : -1) + tabs.length) % tabs.length;
        setTab(tabs[next]); document.getElementById(`project-tab-${next}`)?.focus();
      }
    }}>{label}<Icon icon="mdi:chevron-right" /></button>)}</div>
    <section className="project-tab-panel" id="project-tab-panel" role="tabpanel" aria-labelledby={`project-tab-${tabs.indexOf(tab)}`} tabIndex="0">
      <h2>{tab}</h2>
      {tab === "Overview" && <><p>{project.description}</p><h3>My Contribution</h3><p>{project.myWork}</p><ul className="project-feature-list">{project.features.map(feature => <li key={feature}><Icon icon="mdi:check-circle-outline" /><span>{feature}</span></li>)}</ul></>}
      {tab === "My Role" && <p>{project.myWork}</p>}
      {tab === "Key Features" && <ul className="project-feature-list">{project.features.map(feature => <li key={feature}><Icon icon="mdi:check-circle-outline" /><span>{feature}</span></li>)}</ul>}
      {tab === "Tech Stack" && <div className="project-stack">{project.tags.map(([label, icon]) => <div key={label}><Icon icon={icon} /><strong>{label}</strong></div>)}</div>}
      {tab === "App Flow" && <><ol className="project-flow">{project.flow.map((step, index) => <li key={step.title}><span className="project-flow-number">{String(index + 1).padStart(2, "0")}</span><div><h3>{step.title}</h3><p>{step.description}</p></div></li>)}</ol>{project.notes && <p className="project-scope-note">{project.notes}</p>}</>}
      {tab === "Screenshots" && <ProjectGallery key={project.id} screenshots={project.screenshots} />}
    </section></div>
    <footer className="project-page-footer"><span>Every project is a new lesson.</span><Link className="paper-button" to="/contact">Let's Connect <Icon icon="mdi:arrow-right" /></Link></footer>
  </main>;
}
