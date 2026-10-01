import { Icon } from "@iconify/react";
import "./Skills.css";

const skillGroups = [
	{
		title: "Frontend Development",
		description: "พัฒนาหน้าเว็บที่รองรับทุกขนาดหน้าจอ",
		color: "blue",
		icons: [["HTML", "logos:html-5"], ["CSS", "logos:css-3"], ["Bootstrap", "logos:bootstrap"], ["JavaScript", "logos:javascript"], ["React.js", "logos:react"]],
	},
	{
		title: "Backend Development",
		description: "พัฒนา API และจัดการข้อมูล",
		color: "orange",
		icons: [["Python", "logos:python"], ["PHP", "logos:php"], ["Node.js", "logos:nodejs-icon"], ["REST API", "mdi:api"], ["JSON", "mdi:code-json"]],
	},
	{
		title: "Mobile Development",
		description: "พัฒนาแอปมือถือที่ใช้งานได้หลายแพลตฟอร์ม",
		color: "green",
		icons: [["Flutter", "logos:flutter"], ["Dart", "logos:dart"]],
	},
	{
		title: "IoT & Embedded System",
		description: "เชื่อมต่อเซนเซอร์และอุปกรณ์สมองกลฝังตัว",
		color: "purple",
		icons: [["ESP32", "mdi:chip"], ["Arduino", "simple-icons:arduino"], ["DHT22 Sensor", "mdi:thermometer"], ["Raspberry Pi", "logos:raspberry-pi"], ["MQTT", "mdi:access-point-network"], ["Node-RED", "simple-icons:nodered"]],
	},
];

const tools = [
	["Visual Studio Code", "vscode-icons:file-type-vscode"], ["GitHub", "mdi:github"], ["Git", "logos:git-icon"],
	["Firebase", "logos:firebase"],["Supabase", "logos:supabase"], ["Arduino IDE", "simple-icons:arduino"], ["Linux", "logos:linux-tux"],["Azure", "logos:microsoft-azure"],
];

const otherSkills = [
	["Teamwork", "การทำงานร่วมกับผู้อื่น", "mdi:account-group-outline"],
	["Time Management", "การจัดลำดับและบริหารเวลา", "mdi:clock-outline"],
	["Attention to Detail", "ความละเอียดรอบคอบในการทำงาน", "mdi:eye-check-outline"],
	["Responsibility", "ความรับผิดชอบต่องานที่ได้รับ", "mdi:briefcase-check-outline"],
];

function Skills() {
	return (
		<main className="skills-page">
			<section className="skills-hero" aria-labelledby="skills-title">
				<div className="skills-heading">
					<span className="page-kicker">SKILLS</span>
					<h1 id="skills-title">Skills <span>&amp; Tools.</span></h1>
					<p>ทักษะ เครื่องมือ และเทคโนโลยีที่ใช้ในการพัฒนางาน<br />ทั้งด้าน Web, Mobile Application และ IoT</p>
				</div>
				<div className="skills-visual" aria-hidden="true">
					<div className="skills-note">Keep<br />Learning.<br />Keep<br />Growing.</div>
					<div className="skills-plant"><span /><span /><span /><i /></div>
					<div className="skills-editor">
						<div className="skills-editor-bar"><i /><i /><i /><span>Home.jsx</span></div>
						<div className="skills-editor-code"><b>import</b> React from <em>"react"</em><br /><br /><b>const</b> Home = () =&gt; {'{'}<br />&nbsp;&nbsp;<span>return</span> (<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;div className=<em>"home"</em>&gt;<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Build · Learn · Create<br />&nbsp;&nbsp;&nbsp;&nbsp;&lt;/div&gt;<br />&nbsp;&nbsp;);<br />{'}'}</div>
					</div>
				</div>
			</section>

			<section className="skill-groups" aria-label="Technical skills">
				{skillGroups.map((group, index) => (
					<article className={`skill-group ${group.color}`} key={group.title}>
						<div className="skill-group-heading"><span>0{index + 1}</span><h2>{group.title}</h2></div>
						<p>{group.description}</p>
						<div className="skill-icons">{group.icons.map(([label, icon]) => <span key={label}><Icon icon={icon} /><small>{label}</small></span>)}</div>
					</article>
				))}
			</section>

			<section className="skills-lower" aria-label="Additional skills and tools">
				<div className="tools-panel">
					<header><Icon icon="mdi:school-outline" /><div><h2>Tools &amp; Platforms</h2><p>เครื่องมือและแพลตฟอร์มที่ใช้ในการพัฒนางาน</p></div></header>
					<div className="tool-list">{tools.map(([label, icon]) => <span key={label}><Icon icon={icon} /><small>{label}</small></span>)}</div>
				</div>
				<div className="other-panel">
					<header><Icon icon="mdi:lightbulb-on-outline" /><div><h2>Other Skills</h2><p>ทักษะอื่น ๆ ที่ช่วยในการทำงาน</p></div></header>
					<div className="other-list">{otherSkills.map(([label, description, icon]) => <span key={label}><Icon icon={icon} /><span><strong>{label}</strong><small>{description}</small></span></span>)}</div>
				</div>
			</section>
		</main>
	);
}

export default Skills;
