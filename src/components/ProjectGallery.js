import { useState } from "react";
import { Icon } from "@iconify/react";

export default function ProjectGallery({ screenshots, initialIndex = 0 }) {
  const [selected, setSelected] = useState(Math.min(Math.max(initialIndex, 0), screenshots.length - 1));
  const current = screenshots[selected];
  const move = direction => setSelected(index => (index + direction + screenshots.length) % screenshots.length);
  return <div className="project-gallery">
    <figure className="project-gallery-stage">
      <a href={`${process.env.PUBLIC_URL}${current.src}`} target="_blank" rel="noreferrer" aria-label={`Open ${current.title} screenshot`}>
        <img src={`${process.env.PUBLIC_URL}${current.src}`} alt={current.title} />
      </a>
      <figcaption aria-live="polite"><strong>{current.title}</strong><p>{current.description}</p></figcaption>
    </figure>
    <div className="project-gallery-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous screenshot" title="Previous screenshot"><Icon icon="mdi:arrow-left" /></button>
      <span>{selected + 1} / {screenshots.length}</span>
      <button type="button" onClick={() => move(1)} aria-label="Next screenshot" title="Next screenshot"><Icon icon="mdi:arrow-right" /></button>
    </div>
    <div className="project-gallery-thumbnails" role="group" aria-label="Choose screenshot">
      {screenshots.map((screenshot, index) => <button type="button" key={screenshot.src} aria-pressed={selected === index} onClick={() => setSelected(index)}>
        <img src={`${process.env.PUBLIC_URL}${screenshot.src}`} alt="" loading="lazy" /><span>{screenshot.title}</span>
      </button>)}
    </div>
  </div>;
}
