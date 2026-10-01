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
						ฉันเป็นนักศึกษาวิศวกรรมคอมพิวเตอร์ที่สนใจทั้งด้านการออกแบบและการพัฒนา
					</p>
					<blockquote className="about-quote">
						<span aria-hidden="true">“</span>
						<div>
							Keep learning, keep creating, and keep improving.<br />
							ทุกโปรเจกต์คือโอกาสในการเรียนรู้และพัฒนาตัวเอง
						</div>
					</blockquote>
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
							<span className="information-icon icon-role"><Icon icon="mdi:chart-box-outline" aria-hidden="true" /></span>
							<dt>GPA</dt><dd>2.80</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-role"><Icon icon="mdi:domain" aria-hidden="true" /></span>
							<dt>University</dt><dd>King Mongkut's University of Technology North Bangkok</dd>
						</div>
						<div className="information-row">
							<span className="information-icon icon-location"><Icon icon="mdi:map-marker-outline" aria-hidden="true" /></span>
							<dt>Location</dt><dd>Bangkok, Thailand</dd>
						</div>
					</dl>
				</section>

				<div className="about-right-column">
					<section className="about-highlights" aria-label="Personal highlights">
						<article className="about-highlight">
							<span className="highlight-icon"><Icon icon="mdi:clipboard-check-outline" aria-hidden="true" /></span>
							<div><h3>Detail-Oriented</h3><p>ใส่ใจรายละเอียดและความเรียบร้อยของงาน</p></div>
						</article>
						<article className="about-highlight">
							<span className="highlight-icon"><Icon icon="mdi:book-open-page-variant-outline" aria-hidden="true" /></span>
							<div><h3>Always Learning</h3><p>พร้อมเรียนรู้และพัฒนาตัวเองอยู่เสมอ</p></div>
						</article>
						<article className="about-highlight">
							<span className="highlight-icon"><Icon icon="mdi:lightbulb-on-outline" aria-hidden="true" /></span>
							<div><h3>Open to Learn</h3><p>เปิดรับการเรียนรู้สิ่งใหม่</p></div>
						</article>
					</section>
					<aside className="fun-facts-panel" aria-labelledby="fun-facts-title">
						<header className="fun-facts-heading">
							<Icon className="fun-facts-star" icon="mdi:star-outline" aria-hidden="true" />
							<h2 id="fun-facts-title">Fun Facts</h2>
							<Icon className="fun-facts-sparkle" icon="mdi:creation-outline" aria-hidden="true" />
						</header>
						<ul className="fun-facts-list">
							<li><span className="fact-icon fact-movie"><Icon icon="mdi:movie-open-outline" aria-hidden="true" /></span><span>เวลาว่างชอบดูหนัง</span></li>
							<li><span className="fact-icon fact-family"><Icon icon="mdi:account-group-outline" aria-hidden="true" /></span><span>ชอบใช้เวลากับครอบครัว</span></li>
							<li><span className="fact-icon fact-music"><Icon icon="mdi:music-note-outline" aria-hidden="true" /></span><span>ชอบฟังเพลงตอนพักผ่อน</span></li>
						</ul>
					</aside>
				</div>
			</section>
		</main>
	);
}

export default About;
