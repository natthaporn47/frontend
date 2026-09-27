import "./About.css";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

function About() {
	return (
		<main className="about-page">
			<section className="about-layout">
				<section className="about-copy" aria-labelledby="about-title">
					<h1 id="about-title">About Me</h1>
					<h2>รู้จักฉันให้มากขึ้น</h2>
					<p>
						ฉันเป็นนักศึกษาวิศวกรรมคอมพิวเตอร์ที่สนใจ UX/UI Design, Frontend Development
						และการสร้างเว็บไซต์ที่ใช้งานได้จริง
					</p>
					<blockquote className="about-quote">
						<span aria-hidden="true">“</span>
						Still a student, but always a learner.
					</blockquote>
					<div className="about-highlights" aria-label="Personal highlights">
						<span>Curious</span>
						<span>Team Player</span>
						<span>Problem Solver</span>
						<span>Design &amp; Development</span>
					</div>
				</section>

				<section className="basic-information" aria-labelledby="basic-information-title">
					<header className="panel-heading">
						<span className="panel-heading-icon"><Icon icon="mdi:account-outline" aria-hidden="true" /></span>
						<h2 id="basic-information-title">Basic Information</h2>
					</header>
					<dl className="information-list">
						<div className="information-row">
							<span className="information-icon icon-name"><Icon icon="mdi:account-outline" aria-hidden="true" /></span>
							<dt>Name</dt><dd>Nattaporn Wangsuk</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-education"><Icon icon="mdi:school-outline" aria-hidden="true" /></span>
							<dt>Education</dt><dd>Bachelor's Degree<br />Computer Engineering</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-role"><Icon icon="mdi:domain" aria-hidden="true" /></span>
							<dt>University</dt><dd>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-interests"><Icon icon="mdi:heart-outline" aria-hidden="true" /></span>
							<dt>Interests</dt><dd>UX/UI Design, Web Development,<br />IoT, Cloud Computing</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-location"><Icon icon="mdi:map-marker-outline" aria-hidden="true" /></span>
							<dt>Location</dt><dd>Bangkok, Thailand</dd>
						</div>
					</dl>
				</section>

				<aside className="career-column" aria-labelledby="career-title">
					<div className="about-sticky-note" aria-hidden="true">
						Good Ideas<br />Better<br />Tomorrow <span>♡</span>
					</div>
					<section className="career-goal">
						<header className="panel-heading">
							<span className="panel-heading-icon career-icon"><Icon icon="mdi:bullseye-arrow" aria-hidden="true" /></span>
							<h2 id="career-title">Career Goal</h2>
						</header>
						<p>
							พัฒนาทักษะด้าน UX/UI Design และ Frontend Development เพื่อสร้างเว็บไซต์ที่ใช้งานง่าย มีประโยชน์ และนำไปใช้ได้จริง
						</p>
						<Link to="/skills" className="career-link" aria-label="View skills">
							<Icon icon="mdi:arrow-top-right" aria-hidden="true" />
						</Link>
					</section>
				</aside>
			</section>
		</main>
	);
}

export default About;
