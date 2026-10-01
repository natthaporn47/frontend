import { Icon } from "@iconify/react";
import "./Projects.css";

const projects = [
  {
    id: "hungryhub",
    title: "HungryHub",
    category: "Mobile Application",
    description:
      "แอปพลิเคชันสำหรับค้นหาและแนะนำเมนูอาหารและเครื่องดื่ม พร้อมแสดงข้อมูลเมนูและวิธีการทำอาหาร",
    myWork: "พัฒนา Mobile Application และเชื่อมต่อข้อมูลผ่าน REST API",
    tags: [
      ["Flutter", "logos:flutter"],
      ["Dart", "logos:dart"],
      ["REST API", "mdi:api"],
      ["JSON", "mdi:code-json"],
    ],
  },
  {
    id: "vanvan",
    title: "VanVan Public Van Management System",
    category: "Software Engineering Project",
    description:
      "ระบบบริหารจัดการรถตู้สาธารณะ ออกแบบจากการวิเคราะห์ความต้องการของผู้ใช้งานและโครงสร้างระบบ",
    myWork:
      "วิเคราะห์ User Requirements, System Requirements, ออกแบบ UML Diagram และจัดทำ Software Requirement Specification (SRS)",
    tags: [
      ["HTML", "logos:html-5"],
      ["CSS", "logos:css-3"],
      ["JavaScript", "logos:javascript"],
      ["Node.js", "logos:nodejs-icon"],
      ["Express.js", "simple-icons:express"],
    ],
  },
  {
    id: "agricultural-spraying",
    title: "Automatic Spraying Boat System",
    category: "Web & IoT Application",
    description:
      "เว็บแอปพลิเคชันสำหรับควบคุม ติดตามสถานะ และจัดการภารกิจของเรือพ่นยาอัตโนมัติ",
    myWork:
      "ออกแบบและพัฒนาหน้า Home, Mission, Map และ Operation History",
    tags: [
      ["React.js", "logos:react"],
      ["JavaScript", "logos:javascript"],
      ["HTML", "logos:html-5"],
      ["CSS", "logos:css-3"],
    ],
  },
];

function Projects() {
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

			<section className="project-grid" aria-label="Project portfolio">
				{projects.map((project, index) => (
						<article className="project-card" key={project.id}>
							<div className="project-card-body">
								<div className="project-card-number">{String(index + 1).padStart(2, "0")}<span /></div>
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
							</div>
						</article>
				))}
			</section>
		</main>
	);
}

export default Projects;
