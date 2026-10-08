import { Icon } from "@iconify/react";
import "./Skills.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { skillGroups, tools } from "../data/skills";

const toolGroup = { title: "Tools & Platforms", description: "เครื่องมือและแพลตฟอร์มที่ใช้ในการพัฒนางาน", icons: tools.map(([label, icon]) => [label === "Visual Studio Code" ? "VS Code" : label, label === "Arduino IDE" ? "devicon:arduino" : icon]), color: "mint" };
const groups = [
  { ...skillGroups[0], description: "พัฒนาเว็บไซต์และส่วนติดต่อผู้ใช้งาน", icons: skillGroups[0].icons.map(([label, icon]) => [label === "React.js" ? "React" : label, label === "HTML" ? "vscode-icons:file-type-html" : label === "CSS" ? "thesvg-color:css" : icon]), area: "frontend", symbol: "tabler:device-imac-code" },
  { ...skillGroups[2], description: "พัฒนา Mobile Application\nทั้ง Android และ iOS", area: "mobile", symbol: "heroicons:device-phone-mobile" },
  { ...skillGroups[1], area: "backend", symbol: "bi:database" },
  { ...toolGroup, area: "tools", symbol: "heroicons:wrench" },
  { ...skillGroups[3], description: "การพัฒนาและใช้งานอุปกรณ์ IoT", icons: [["ESP32", "mdi:chip"], ["Arduino uno", "devicon:arduino"], ["DHT22", "ic:round-device-thermostat"], ["Raspberry Pi", "logos:raspberry-pi"], ["MQTT", "selfhst:mqtt"], ["Node-RED", "selfhst:node-red"]], area: "iot", symbol: "ion:hardware-chip-outline" },
];
const groupFilters = ["Frontend", "Mobile", "Backend", "Tools & Platforms", "IoT & Hardware"];
const filters = ["All", ...groupFilters];
const compactFilters = ["All", "Frontend", "Mobile", "Backend", "Tools", "IoT"];
const filterIcons = ["icon-park-outline:all-application", ...groups.map(group => group.symbol)];
const workingApproach = [
  { icon: "mdi:account-group-outline", title: "Problem Solving", description: "วิเคราะห์และแก้ปัญหาอย่างเป็นระบบ" },
  { icon: "hugeicons:message-square-more", title: "Communication", description: "สื่อสารแนวคิดและขั้นตอนการทำงาน" },
  { icon: "mdi:clock-outline", title: "Time Management", description: "จัดลำดับงานและวางแผนการพัฒนา" },
  { icon: "mdi:account-multiple-outline", title: "Teamwork", description: "ร่วมออกแบบและพัฒนาโปรเจกต์เป็นทีม" },
  { icon: "fluent:star-12-regular", title: "Adaptability", description: "เรียนรู้เทคโนโลยีใหม่และปรับใช้กับงาน" },
];
const displayIcons = { Flutter: "logos:flutter-icon", Firebase: "logos:firebase-icon", Supabase: "logos:supabase-icon" };

export default function Skills() {
  const location = useLocation();
  const [filter, setFilter] = useState("All");
  const [filterChanged, setFilterChanged] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState(() => {
    const incomingLabel = { "React.js": "React", "Visual Studio Code": "VS Code", "DHT22 Sensor": "DHT22", Arduino: "Arduino uno" }[location.state?.skillLabel] || location.state?.skillLabel;
    for (const group of groups) {
      const match = group.icons.find(([label]) => label === incomingLabel);
      if (match) return { label: match[0], icon: match[1], group };
    }
    return { label: "React", icon: "logos:react", group: groups[0] };
  });
  return <main className="skills-page skills-reference detail-paper">
    <div className="skills-inner">
    <header className="skills-hero"><div className="skills-heading"><h1>Skills <span>&amp;</span> Technologies</h1><p>เครื่องมือและเทคโนโลยีที่ใช้พัฒนาเว็บ แอปมือถือ และระบบ IoT</p></div></header>
    <div className="paper-filters" role="group" aria-label="Filter skills">{filters.map((option, index) => <button type="button" key={option} title={option} aria-label={option} aria-pressed={filter === option} onClick={() => { if (option !== filter) { setFilterChanged(true); setFilter(option); } }}><Icon icon={filterIcons[index]} aria-hidden="true" /><span className="skills-filter-label">{option}</span><span className="skills-filter-compact" aria-hidden="true">{compactFilters[index]}</span></button>)}</div>
    <div key={filter} className={`skills-layout${filter !== "All" ? " is-filtered" : ""}${filterChanged ? " is-entering" : ""}`}>
    <section className={`skill-groups ${filter !== "All" ? "is-filtered" : ""}`} aria-label="Technical skills">{groups.filter((group, index) => filter === "All" || groupFilters[index] === filter).map(group => <article className={`skill-group ${group.color} skill-area-${group.area}`} key={group.title}>
      <header><div className="skill-group-art" aria-hidden="true"><Icon className="skill-group-symbol" icon={group.symbol} /><Icon className="skill-art-spark" icon="mdi:creation-outline" /></div><div><h2>{group.area === "iot" ? "IoT & Hardware" : group.title.replace(" Development", "")}</h2><p>{group.description}</p></div></header>
      <div className="skill-icons">{group.icons.map(([label, icon]) => <button className="skill-pick" type="button" key={label} aria-pressed={selectedSkill.label === label} onClick={() => setSelectedSkill({ label, icon, group })} title={label}>{label === "Arduino uno" ? <img src={`${process.env.PUBLIC_URL}/images/skills-icons8-68008.png`} alt="" width="100" height="100" /> : <Icon icon={displayIcons[label] || icon} aria-hidden="true" />}<small>{label}</small><span className="skill-selection-line" aria-hidden="true" /></button>)}</div>
      <footer className="skill-group-summary" aria-hidden="true"><span className="skill-group-accent" /></footer>
    </article>)}{filter === "All" && <section className="skills-learning" aria-labelledby="skills-learning-title"><h2 id="skills-learning-title"><Icon className="learning-sticker" icon="streamline-freehand:creativity-idea-bulb" aria-hidden="true" />Currently Learning</h2><ul><li><Icon icon="mdi:circle-small" aria-hidden="true" />React &amp; JavaScript</li><li><Icon icon="mdi:circle-small" aria-hidden="true" />IoT &amp; Embedded Systems</li><li><Icon icon="mdi:circle-small" aria-hidden="true" />Cloud Computing</li></ul><p>Small steps, steady progress.</p></section>}</section>
    <section className="skills-approach" aria-labelledby="skills-approach-title"><h2 id="skills-approach-title"><Icon icon="openmoji:paw-prints" aria-hidden="true" /><span>Soft Skills</span><Icon icon="openmoji:paw-prints" aria-hidden="true" /></h2><div className="skills-approach-items">{workingApproach.map(item => <article key={item.title}><Icon icon={item.icon} aria-hidden="true" /><div><h3>{item.title}</h3><p>{item.description}</p></div></article>)}</div></section>
    </div>
    </div>
  </main>;
}
