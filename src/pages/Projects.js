import { useState } from "react";
import "./Projects.css";

const projects = [
	{
		id: "agri",
		title: "Automatic Agricultural System",
		category: "Web Development",
		description: "ระบบจัดการแปลงเกษตรอัตโนมัติ พร้อมติดตามข้อมูลผ่านหน้า Dashboard",
		tags: ["React", "IoT", "Responsive"],
		preview: "agri-preview",
	},
	{
		id: "quiz",
		title: "React Quiz Application",
		category: "Web Development",
		description: "เว็บแอปแบบทดสอบที่ช่วยให้การเรียนรู้สนุกและติดตามผลได้ง่ายขึ้น",
		tags: ["React", "JavaScript", "CSS"],
		preview: "quiz-preview",
	},
	{
		id: "farm-app",
		title: "UI/UX Design - Farm App",
		category: "UI/UX Design",
		description: "ออกแบบแอปสำหรับเกษตรกร ตั้งแต่สำรวจข้อมูลจนถึงติดตามผลผลิต",
		tags: ["Figma", "UI/UX", "Prototype"],
		preview: "farm-preview",
	},
	{
		id: "sensor",
		title: "Smart Sensor Dashboard",
		category: "IoT / Hardware",
		description: "แดชบอร์ดแสดงข้อมูลจากเซนเซอร์เพื่อช่วยดูแลสภาพแวดล้อม",
		tags: ["IoT", "Dashboard", "Hardware"],
		preview: "sensor-preview",
	},
];

const categories = ["All", "Web Development", "IoT / Hardware", "UI/UX Design", "Other"];

function ProjectPreview({ type }) {
	return (
		<div className={`project-preview ${type}`} aria-hidden="true">
			{type === "agri-preview" && (
				<div className="agri-window">
					<div className="preview-nav"><b>Farm<span>io</span></b><i /><i /><i /></div>
					<div className="agri-content">
						<div className="agri-field"><span>Good morning, farmer</span><strong>Farm overview</strong><div className="field-art"><span /><span /><span /></div></div>
						<div className="agri-stats"><b>Soil moisture<em>68%</em></b><b>Temperature<em>24°C</em></b><div /></div>
					</div>
				</div>
			)}
			{type === "quiz-preview" && (
				<div className="quiz-window">
					<div className="quiz-top"><b>Q</b><span>Question 04 <small>of 10</small></span><i>04:32</i></div>
					<strong>Which one is a JavaScript library?</strong>
					<div className="quiz-option">A <span>Vue.js</span></div>
					<div className="quiz-option selected">B <span>React</span></div>
					<div className="quiz-option">C <span>Django</span></div>
				</div>
			)}
			{type === "farm-preview" && (
				<div className="phone-group">
					<div className="phone-screen"><b>Farm<br />Connect</b><i /><span>My garden</span><div className="phone-plant">♧</div><small>Growing well</small></div>
					<div className="phone-screen"><b>Today</b><div className="phone-weather">☀ 28°</div><span>Plant health</span><div className="health-bar" /><small>Excellent</small></div>
					<div className="phone-screen"><b>Harvest</b><div className="phone-chart"><i /><i /><i /><i /></div><span>Weekly growth</span></div>
				</div>
			)}
			{type === "sensor-preview" && (
				<div className="sensor-window">
					<div className="sensor-heading"><b>Environment</b><span>Live</span></div>
					<div className="sensor-values"><div><small>Temperature</small><b>24.8°</b></div><div><small>Humidity</small><b>68%</b></div></div>
					<div className="sensor-chart"><i /><i /><i /><i /><i /><i /><i /></div>
				</div>
			)}
		</div>
	);
}

function Projects() {
	const [activeCategory, setActiveCategory] = useState("All");
	const visibleProjects = activeCategory === "All"
		? projects.slice(0, 3)
		: projects.filter((project) => project.category === activeCategory);

	return (
		<main className="projects-page">
			<header className="projects-heading">
				<span className="projects-number">03. Projects</span>
				<h1>Projects<span className="heading-sparkle">✧</span></h1>
				<p>โปรเจกต์ที่ได้ลงมือออกแบบ ทดลอง และพัฒนาด้วยตัวเอง</p>
			</header>

			<section className="projects-content" aria-label="Project portfolio">
				<aside className="project-filters" aria-label="Filter projects">
					{categories.map((category) => (
						<button
							key={category}
							className={activeCategory === category ? "filter-button active" : "filter-button"}
							aria-pressed={activeCategory === category}
							onClick={() => setActiveCategory(category)}
						>
							{category}
						</button>
					))}
				</aside>

				<div className="project-grid" aria-live="polite">
					{visibleProjects.map((project) => (
						<article className="project-card" key={project.id}>
							<ProjectPreview type={project.preview} />
							<div className="project-card-body">
								<span className="project-category">{project.category}</span>
								<h2>{project.title}</h2>
								<p>{project.description}</p>
								<div className="project-tags">
									{project.tags.map((tag) => <span key={tag}>{tag}</span>)}
								</div>
								<span className="project-arrow" aria-hidden="true">↗</span>
							</div>
						</article>
					))}
					{visibleProjects.length === 0 && (
						<p className="empty-projects">ยังไม่มีโปรเจกต์ในหมวดหมู่นี้</p>
					)}
				</div>
			</section>
			<p className="projects-note">More projects<br />are on the way <span>↗</span></p>
		</main>
	);
}

export default Projects;
