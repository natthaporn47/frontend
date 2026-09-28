import { Icon } from "@iconify/react";
import "./Skills.css";

const skillGroups = [
	{
		title: "Frontend Development",
		description: "สร้างหน้าเว็บไซต์และส่วนติดต่อผู้ใช้",
		color: "blue",
		icons: [["HTML", "logos:html-5"], ["CSS", "logos:css-3"], ["JavaScript", "logos:javascript"], ["React.js", "logos:react"]],
		points: ["พัฒนาเว็บไซต์ Responsive", "ออกแบบและพัฒนา UI/UX", "สร้างหน้าเว็บด้วย React.js"],
	},
	{
		title: "Backend Development",
		description: "พัฒนาและจัดการระบบหลังบ้าน",
		color: "orange",
		icons: [["Python", "logos:python"], ["PHP", "logos:php"], ["Node.js", "logos:nodejs-icon"], ["REST API", "mdi:api"]],
		points: ["พัฒนาและเชื่อมต่อฐานข้อมูล", "สร้างและใช้งาน REST API", "จัดการข้อมูลและระบบหลังบ้าน"],
	},
	{
		title: "Mobile Development",
		description: "ออกแบบและพัฒนาแอปมือถือ",
		color: "green",
		icons: [["Flutter", "logos:flutter"], ["Dart", "logos:dart"]],
		points: ["พัฒนาแอปพลิเคชันด้วย Flutter", "ออกแบบ UI/UX สำหรับมือถือ", "เชื่อมต่อ API และจัดการข้อมูล"],
	},
	{
		title: "IoT & Embedded System",
		description: "พัฒนาและเชื่อมต่ออุปกรณ์ IoT",
		color: "purple",
		icons: [["ESP32", "mdi:chip"], ["Arduino", "simple-icons:arduino"], ["MQTT", "mdi:access-point-network"], ["Node-RED", "simple-icons:nodered"]],
		points: ["เชื่อมต่อเซนเซอร์และอุปกรณ์ IoT", "ส่งข้อมูลด้วย MQTT", "สร้างระบบควบคุมและแสดงผลผ่านเว็บ"],
	},
];

const tools = [
	["Visual Studio Code", "vscode-icons:file-type-vscode"], ["GitHub", "mdi:github"], ["Figma", "logos:figma"], ["Postman", "logos:postman"],
	["Firebase", "logos:firebase"], ["Vercel", "logos:vercel"], ["Linux", "logos:linux-tux"], ["Raspberry Pi", "logos:raspberry-pi"],
];

const otherSkills = [
	["UI/UX Design", "mdi:palette-outline"], ["Problem Solving", "mdi:cog-outline"], ["Communication", "mdi:message-processing-outline"],
	["System Analysis", "mdi:file-document-outline"], ["Time Management", "mdi:clock-outline"], ["Teamwork", "mdi:account-group-outline"], ["Adaptability", "mdi:chart-bar"],
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
						<ul>{group.points.map((point) => <li key={point}>{point}</li>)}</ul>
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
					<div className="other-list">{otherSkills.map(([label, icon]) => <span key={label}><Icon icon={icon} />{label}</span>)}</div>
				</div>
			</section>
		</main>
	);
}

export default Skills;
