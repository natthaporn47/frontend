import { Icon } from "@iconify/react";
import "./Skills.css";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { projects } from "../data/projects";

import { skillGroups, tools } from "../data/skills";

const otherSkills = [
	["Teamwork", "การทำงานร่วมกับผู้อื่น", "mdi:account-group-outline"],
	["Time Management", "การจัดลำดับและบริหารเวลา", "mdi:clock-outline"],
	["Attention to Detail", "ความละเอียดรอบคอบในการทำงาน", "mdi:eye-check-outline"],
	["Responsibility", "ความรับผิดชอบต่องานที่ได้รับ", "mdi:briefcase-check-outline"],
];

function Skills() {
	const location = useLocation();
	const [selectedSkill, setSelectedSkill] = useState(() => {
		for (const group of skillGroups) {
			const match = group.icons.find(([label]) => label === location.state?.skillLabel);
			if (match) return { label: match[0], icon: match[1], group };
		}
		const tool = tools.find(([label]) => label === location.state?.skillLabel);
		if (tool) return { label: tool[0], icon: tool[1], group: { title: "Tools & Platforms", description: "เครื่องมือและแพลตฟอร์มที่ใช้ในการพัฒนางาน" } };
		return { label: "React.js", icon: "logos:react", group: skillGroups[0] };
	});
	const relatedProjects = projects.filter((project) => project.tags.some(([label]) => label === selectedSkill.label));
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
						<div className="skill-icons">{group.icons.map(([label, icon]) => <button className="skill-pick" type="button" key={label} aria-pressed={selectedSkill.label === label} onClick={() => setSelectedSkill({ label, icon, group })} title={label}><Icon icon={icon} aria-hidden="true" /><small>{label}</small></button>)}</div>
					</article>
				))}
			</section>
			<section className="skill-spotlight" aria-labelledby="skill-spotlight-title"><div className="skill-spotlight-title"><Icon icon={selectedSkill.icon} aria-hidden="true" /><div><span>{selectedSkill.group.title}</span><h2 id="skill-spotlight-title">{selectedSkill.label}</h2></div></div><div className="skill-spotlight-content" key={selectedSkill.label}><p>{selectedSkill.group.description}</p>{relatedProjects.length > 0 ? <div className="skill-projects">{relatedProjects.map((project) => <Link key={project.id} to="/projects" state={{ projectId: project.id }}>{project.title}<Icon icon="mdi:arrow-top-right" aria-hidden="true" /></Link>)}</div> : <span className="skill-practice">Learning &amp; Practice</span>}</div></section>

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
