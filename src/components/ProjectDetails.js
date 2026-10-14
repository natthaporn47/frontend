import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import ProjectGallery from "./ProjectGallery";
import "./ProjectPreview.css";
import { projects } from "../data/projects";

export default function ProjectDetails({ project, onDismiss, initialScreenshot }) {
  const dialog = useRef(null);
  const [expanded, setExpanded] = useState(false);
  const previewIndex = initialScreenshot ?? 0;
  useEffect(() => {
    const modal = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    if (!modal.open) modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return <dialog ref={dialog} className={`project-dialog project-preview-dialog ${project.color}`} aria-labelledby="project-dialog-title" onClose={event => { if (event.target === event.currentTarget) onDismiss(); }} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onDismiss();
  }}>
    <button className="project-preview-close" type="button" aria-label="Close project details" title="Close project details" onClick={onDismiss}><Icon icon="mdi:close" aria-hidden="true" /></button>
    <div className="project-preview-layout">
      <div className="project-preview-media">
        {project.screenshots?.length > 0 ? <ProjectGallery screenshots={project.screenshots} initialIndex={previewIndex} color={project.color} compact coverImages={[]} /> : <div className="project-preview-reserved" role="img" aria-label="Reserved space for actual boat project image" />}
      </div>
      <div className="project-preview-copy">
        <div className="project-preview-meta"><span>{String(projects.findIndex(item => item.id === project.id) + 1).padStart(2, "0")}</span><span>{projects.find(item => item.id === project.id)?.category || project.category}</span></div>
        <div className="project-dialog-heading"><h2 id="project-dialog-title">{project.id === "agricultural-spraying" ? <>Automatic Spraying Boat <span className="project-title-tail">System <Icon icon={project.icon} aria-hidden="true" /></span></> : <>{project.title} <Icon icon={project.id === "hungryhub" ? "famicons:fast-food-outline" : project.icon} aria-hidden="true" /></>}</h2></div>
        <p className="project-dialog-description">{project.description}</p>
        <section className="project-preview-features" aria-label="Key Features"><ul>{project.features.slice(0, 4).map((feature) => <li key={feature}><Icon icon="basil:checked-box-outline" aria-hidden="true" /><span>{feature}</span></li>)}</ul></section>
        <section className="project-preview-technologies"><h3>เทคโนโลยีที่ใช้</h3><div className="project-tags" aria-label="Project technologies">{project.tags.map(([label]) => <span key={label}>{label}</span>)}</div></section>
        {expanded && <section id="project-preview-extra" className="project-preview-role"><h3>My Contribution</h3><ul><li>{project.myWork}</li>{project.features.slice(4).map(feature => <li key={feature}>{feature}</li>)}</ul></section>}
        <footer className="project-preview-footer">
          <button type="button" className="project-preview-expand" aria-expanded={expanded} aria-controls="project-preview-extra" onClick={() => setExpanded(value => !value)}>{expanded ? "ย่อรายละเอียด" : "ดูรายละเอียดเพิ่มเติม"}</button>
          <Link className="paper-button project-modal-link" to={`/projects/${project.id}`}>หน้า Project <Icon icon="mdi:send-variant-outline" aria-hidden="true" /></Link>
        </footer>
      </div>
    </div>
  </dialog>;
}
