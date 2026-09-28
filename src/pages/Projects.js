import "./Projects.css";

const projects = [
	{
		id: "food-cafe",
		title: "Food & Cafe Mobile Application",
		category: "Mobile Application",
		description: "แอปพลิเคชันมือถือสำหรับค้นหาเมนูอาหาร สั่งอาหาร เครื่องดื่ม และเมนูแนะนำแบบครบจบ",
		details: "พัฒนาด้วย Flutter และ Dart เชื่อมต่อ REST API และฐานข้อมูล JSON",
		tags: ["Flutter", "Dart", "REST API", "JSON"],
		preview: "farm-preview",
	},
	{
		id: "vanvan",
		title: "VanVan Public Van Management System",
		category: "Public Transportation",
		description: "ระบบจัดการรถตู้สาธารณะ ทั้งฝั่งผู้โดยสาร พนักงานขับรถ และผู้ดูแลระบบ",
		details: "วิเคราะห์ความต้องการของผู้ใช้ ออกแบบ UX พร้อมวางโครงสร้างระบบ",
		tags: ["Software Engineering", "UML", "SRS"],
		preview: "quiz-preview",
	},
	{
		id: "agricultural-spraying",
		title: "Agricultural Spraying Robot Web Application",
		category: "Web Application",
		description: "เว็บไซต์ควบคุมและติดตามการทำงานของเรือพ่นสารสำหรับพื้นที่การเกษตร",
		details: "พัฒนาเว็บไซต์ด้วย React.js ออกแบบหน้า Home, Mission, Map และจัดการข้อมูล",
		tags: ["React.js", "JavaScript", "CSS"],
		preview: "agri-preview",
	},
];

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
	return (
		<main className="projects-page">
			<header className="projects-heading">
				<div>
					<span className="page-kicker">PROJECTS</span>
					<h1>My <span>Projects.</span></h1>
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
							<ProjectPreview type={project.preview} />
							<div className="project-card-body">
								<div className="project-card-number">{String(index + 1).padStart(2, "0")}<span /></div>
								<span className="project-category">{project.category}</span>
								<h2>{project.title}</h2>
								<p>{project.description}</p>
								<p className="project-details">{project.details}</p>
								<div className="project-tags">
									{project.tags.map((tag) => <span key={tag}>{tag}</span>)}
								</div>
								<span className="project-view">View Details <span aria-hidden="true">→</span></span>
								<span className="project-arrow" aria-hidden="true">→</span>
							</div>
						</article>
				))}
			</section>
		</main>
	);
}

export default Projects;
