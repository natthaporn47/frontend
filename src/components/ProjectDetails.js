import { useEffect, useRef } from "react";
import { Icon } from "@iconify/react";

export default function ProjectDetails({ project, onDismiss }) {
  const dialog = useRef(null);
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

  return <dialog ref={dialog} className={`project-dialog ${project.color}`} aria-labelledby="project-dialog-title" onClose={onDismiss} onClick={(event) => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onDismiss();
  }}>
    <header className="project-dialog-toolbar"><span>PROJECT NOTES</span><button type="button" aria-label="Close project details" title="Close project details" onClick={onDismiss}><Icon icon="mdi:close" aria-hidden="true" /></button></header>
    <div className="project-dialog-heading"><Icon icon={project.icon} aria-hidden="true" /><span>{project.category}</span><h2 id="project-dialog-title">{project.title}</h2></div>
    <p className="project-dialog-description">{project.description}</p>
    <section><h3>My Contribution</h3><p>{project.myWork}</p></section>
    <section><h3>Project Highlights</h3><ul>{project.features.map((feature) => <li key={feature}><Icon icon="mdi:check-circle-outline" aria-hidden="true" /><span>{feature}</span></li>)}</ul></section>
    <section><h3>Built With</h3><div className="project-tags">{project.tags.map(([label, icon]) => <span key={label}><Icon icon={icon} aria-hidden="true" />{label}</span>)}</div></section>
  </dialog>;
}
