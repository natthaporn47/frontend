import "./About.css";
import { Icon } from "@iconify/react";
import Portrait from "../components/Portrait";

const journey = [
  ["mdi:school-outline", "Engineering", "เรียนรู้พื้นฐานวิศวกรรมคอมพิวเตอร์และการแก้ปัญหาอย่างเป็นระบบ"],
  ["mdi:code-tags", "Web Development", "พัฒนาเว็บด้วย HTML, CSS, JavaScript และ React"],
  ["mdi:cellphone", "Mobile & IoT", "สร้างแอปมือถือด้วย Flutter และเรียนรู้การเชื่อมต่ออุปกรณ์ IoT"],
  ["mdi:lightbulb-on-outline", "Keep Growing", "นำความรู้มาสร้างผลงาน และพัฒนาทักษะใหม่ผ่านการลงมือทำ"],
];

export default function About() {
  return <main className="about-page detail-paper">
    <section className="about-layout">
      <div className="about-portrait home-reveal"><Portrait illustration priority caption="Nice to meet you!" /><Icon className="paper-flower" icon="mdi:flower-outline" aria-hidden="true" /></div>
      <div className="about-copy">
        <h1>About Me <Icon icon="mdi:creation-outline" aria-hidden="true" /></h1>
        <h2>Nattaporn Wangsuk <span>(Earn)</span></h2>
        <p>นักศึกษาวิศวกรรมคอมพิวเตอร์ที่สนใจการออกแบบและพัฒนาเว็บ แอปมือถือ และระบบ IoT ชอบเรียนรู้เทคโนโลยีใหม่ ๆ และเปลี่ยนไอเดียให้เป็นผลงานที่ใช้งานได้จริง</p>
        <dl className="about-facts"><div><Icon icon="mdi:account-heart-outline" /><dt>Nickname</dt><dd>Earn</dd></div><div><Icon icon="mdi:book-open-outline" /><dt>GPA</dt><dd>2.80</dd></div><div><Icon icon="mdi:map-marker-outline" /><dt>Location</dt><dd>Bangkok, Thailand</dd></div></dl>
        <blockquote>Keep learning, keep creating,<br />and keep improving.</blockquote>
      </div>
    </section>
    <section className="about-journey home-reveal" aria-labelledby="about-journey-title"><h2 id="about-journey-title">My Journey <Icon icon="mdi:creation-outline" /></h2><ol>{journey.map(([icon, title, description], index) => <li key={title}><small>0{index + 1}</small><Icon icon={icon} aria-hidden="true" /><h3>{title}</h3><p>{description}</p></li>)}</ol></section>
    <section className="about-education home-reveal"><Icon icon="mdi:school-outline" aria-hidden="true" /><div><h2>Education</h2><strong>Bachelor's Degree · Computer Engineering</strong><p>King Mongkut's University of Technology North Bangkok</p></div><span className="paper-note-small">Learn something<br />new every day.</span></section>
    <section className="about-personality home-reveal" aria-label="Personal interests"><h2>A Little More About Me</h2><ul><li><Icon icon="mdi:movie-open-outline" />ชอบดูหนัง</li><li><Icon icon="mdi:music-note-outline" />ฟังเพลงตอนพักผ่อน</li><li><Icon icon="mdi:account-group-outline" />ใช้เวลากับครอบครัว</li></ul></section>
  </main>;
}
