import "./Resume.css";

function Resume() {
	return (
		<main className="resume-page">
			<header className="resume-intro">
				<div>
					<span className="resume-number">05. Resume (เรซูเม่)</span>
					<h1>Resume</h1>
					<p>สรุปเส้นทางการเรียนรู้และประสบการณ์ของฉัน</p>
					<button className="resume-download" onClick={() => window.print()}>
						Download PDF <span aria-hidden="true">↓</span>
					</button>
				</div>
				<p className="resume-note">“A summary<br />of my journey<br />so far.”</p>
			</header>

			<article className="resume-sheet" aria-label="Resume preview">
				<div className="resume-main-column">
					<header className="resume-person">
						<div>
							<h2>NATTAPORN<br />WANGSUK</h2>
							<p>Computer Engineering Student</p>
						</div>
						<div className="resume-avatar" aria-hidden="true">N</div>
					</header>

					<section className="resume-section">
						<h3>Education</h3>
						<div className="resume-entry">
							<strong>Bachelor's Degree</strong>
							<p>Computer Engineering</p>
							<small>Coursework in software development, design, and technology</small>
						</div>
					</section>

					<section className="resume-section">
						<h3>Skills</h3>
						<p className="resume-skill-list">Web Development · UI/UX Design<br />React · JavaScript · HTML · CSS<br />Problem Solving · Collaboration</p>
					</section>
				</div>

				<aside className="resume-side-column">
					<section className="resume-section resume-contact">
						<h3>Contact</h3>
						<p><span>✉</span> Email</p>
						<p><span>⌘</span> Portfolio</p>
						<p><span>in</span> LinkedIn</p>
					</section>
					<section className="resume-section">
						<h3>Interests</h3>
						<p>UX/UI Design<br />Frontend Development<br />Creative Technology</p>
					</section>
					<p className="resume-motto">Keep<br />Learning<br /><span>↗</span></p>
				</aside>
			</article>
		</main>
	);
}

export default Resume;