import "./About.css";
import { Icon } from "@iconify/react";

function About() {
	return (
		<main className="about-page">
			<section className="about-layout">
				<div className="about-background-decor" aria-hidden="true">
					<span className="about-backdrop-shape shape-main" />
					<span className="about-backdrop-shape shape-left" />
					<span className="about-backdrop-shape shape-bottom" />
				</div>
				<section className="about-copy" aria-labelledby="about-title">
					<span className="page-kicker">ABOUT</span>
					<h1 id="about-title">About <span>Me</span></h1>
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
							<span className="information-icon icon-name"><Icon icon="mdi:account-heart-outline" aria-hidden="true" /></span>
							<dt>Nickname</dt><dd>Earn</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-education"><Icon icon="mdi:book-education-outline" aria-hidden="true" /></span>
							<dt>Major</dt><dd>Bachelor's Degree<br />Computer Engineering</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-education"><Icon icon="mdi:school-outline" aria-hidden="true" /></span>
							<dt>Education</dt><dd>Computer Engineering</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-role"><Icon icon="mdi:domain" aria-hidden="true" /></span>
							<dt>University</dt><dd>King Mongkut's University of Technology North Bangkok</dd>
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

				<aside className="fun-facts-panel" aria-labelledby="fun-facts-title">
					<header className="fun-facts-heading">
						<Icon className="fun-facts-star" icon="mdi:star-outline" aria-hidden="true" />
						<h2 id="fun-facts-title">Fun Facts</h2>
						<Icon className="fun-facts-sparkle" icon="mdi:creation-outline" aria-hidden="true" />
					</header>
					<ul className="fun-facts-list">
						<li><span className="fact-icon fact-coffee"><Icon icon="mdi:coffee-outline" aria-hidden="true" /></span><span>ชอบกาแฟและการทำงานเช้า ๆ</span></li>
						<li><span className="fact-icon fact-camera"><Icon icon="mdi:camera-outline" aria-hidden="true" /></span><span>ชอบถ่ายรูปและเก็บบรรยากาศ</span></li>
						<li><span className="fact-icon fact-music"><Icon icon="mdi:music-note" aria-hidden="true" /></span><span>ฟังเพลงตอนเขียนโค้ด</span></li>
						<li><span className="fact-icon fact-travel"><Icon icon="mdi:send-outline" aria-hidden="true" /></span><span>ชอบเดินทางและหาประสบการณ์ใหม่</span></li>
						<li><span className="fact-icon fact-book"><Icon icon="mdi:book-open-outline" aria-hidden="true" /></span><span>ชอบเรียนรู้เทคโนโลยีใหม่ ๆ</span></li>
						<li><span className="fact-icon fact-nature"><Icon icon="mdi:sprout-outline" aria-hidden="true" /></span><span>สนใจสิ่งแวดล้อมและเทคโนโลยี</span></li>
					</ul>
				</aside>
			</section>
		</main>
	);
}

export default About;
