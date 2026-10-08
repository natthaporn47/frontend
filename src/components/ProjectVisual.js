import { Icon } from "@iconify/react";

export default function ProjectVisual({ project }) {
  if (project.screenshots?.length) {
    const screenshot = project.screenshots[0];
    return <figure className={`project-visual project-visual-screenshot ${project.color}`}>
      <img src={`${process.env.PUBLIC_URL}${screenshot.src}`} alt={`${project.title}: ${screenshot.title}`} loading="lazy" />
    </figure>;
  }
  return <figure className={`project-visual ${project.color}`} role="img" aria-label={`${project.title} technology illustration`}>
    <Icon className="project-visual-symbol" icon={project.icon} aria-hidden="true" />
    <div className="project-visual-tools" aria-hidden="true">{project.tags.slice(0, 3).map(([label, icon]) => <span key={label}><Icon icon={icon} /><small>{label}</small></span>)}</div>
  </figure>;
}
