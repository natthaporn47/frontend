import { Icon } from "@iconify/react";
import "./Projects.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { projects } from "../data/projects";
import ProjectDetails from "../components/ProjectDetails";

function Projects() {
	const location = useLocation();
	const [selectedProject, setSelectedProject] = useState(() => projects.find((project) => project.id === location.state?.projectId) || null);
	const [filter, setFilter] = useState("All");
	const filters = ["All", "Web", "Mobile", "IoT"];
	const visibleProjects = projects.filter((project) => filter === "All" || (filter === "Mobile" ? project.id === "hungryhub" : filter === "IoT" ? project.id === "agricultural-spraying" : project.id !== "hungryhub"));
	return (
		<main className="projects-page">
			<header className="projects-heading">
				<div>
					<span className="page-kicker">PROJECTS</span>
					<h1>My <span>Projects.</span></h1><br />
					<p>ผลงานที่ได้พัฒนา ทั้งในรายวิชาและโปรเจกต์ส่วนตัว<br />เกี่ยวกับ Web, Mobile Application และ IoT</p>
				</div>
				<div className="projects-summary" aria-label="Project summary">
					<strong>{projects.length}</strong>
					<span>Projects</span>
					<p>KEEP LEARNING<br />KEEP BUILDING<br />SOMETHING MEANINGFUL.</p>
				</div>
			</header>

			<div className="project-toolbar">
				<div className="project-filters" role="group" aria-label="Filter projects">
					{filters.map((option) => <button type="button" key={option} aria-pressed={filter === option} onClick={() => setFilter(option)}>{option}</button>)}
				</div>
				<span role="status">{visibleProjects.length} / {projects.length} projects</span>
			</div>
			<section className="project-grid" aria-label="Project portfolio">
				{visibleProjects.map((project) => (
						<article className={`project-card project-${project.color}`} key={project.id}>
							<div className="project-card-body">
								<div className="project-card-number">{String(projects.indexOf(project) + 1).padStart(2, "0")}<span /></div>
								<span className="project-category">{project.category}</span>
								<h2>{project.title}</h2>
                <p className="project-description">{project.description}</p>
                <div className="project-work"><span>My Work</span><p>{project.myWork}</p></div>
                <div className="project-tech">
                  <span>Technology</span>
                  <div className="project-tags">
                    {project.tags.map(([label, icon]) => (
                      <span key={label}><Icon icon={icon} aria-hidden="true" />{label}</span>
                    ))}
                  </div>
                </div>
                <button className="project-details-button" type="button" onClick={() => setSelectedProject(project)} aria-label={`View ${project.title} details`}>Explore Project <Icon icon="mdi:arrow-top-right" aria-hidden="true" /></button>
							</div>
						</article>
				))}
			</section>
			{selectedProject && <ProjectDetails project={selectedProject} onDismiss={() => setSelectedProject(null)} />}
		</main>
	);
}

export default Projects;
