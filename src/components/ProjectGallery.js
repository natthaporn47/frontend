import { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import ProjectImageLightbox from "./ProjectImageLightbox";

export default function ProjectGallery({ screenshots, initialIndex = 0, compact = false, coverImages, color = "coral" }) {
  const [selected, setSelected] = useState(Math.min(Math.max(initialIndex, 0), screenshots.length - 1));
  const [showCover, setShowCover] = useState(!!coverImages?.length);
  const [imageOpen, setImageOpen] = useState(false);
  const thumbnails = useRef(null);
  useEffect(() => {
    const rail = thumbnails.current;
    const button = rail?.children[selected];
    if (compact && button) rail.scrollLeft = button.offsetLeft - rail.offsetLeft - (rail.clientWidth - button.clientWidth) / 2;
  }, [selected, compact]);
  const current = screenshots[selected];
  const move = direction => { setShowCover(false); setSelected(index => (index + direction + screenshots.length) % screenshots.length); };
  return <div className={`project-gallery${compact ? " project-gallery-compact" : ""}${coverImages ? " project-gallery-popup" : ""}`}>
    <figure className="project-gallery-stage">
      <a href={`${process.env.PUBLIC_URL}${current.src}`} aria-label={`Open ${current.title} screenshot`} title="Open image viewer" aria-haspopup="dialog" onClick={event => {
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        setShowCover(false);
        setImageOpen(true);
      }}>
        {showCover ? <div className="project-gallery-cover">{coverImages.map((src, index) => <img key={src} src={`${process.env.PUBLIC_URL}${src}`} alt={`${current.title} preview ${index + 1}`} />)}</div> : <img src={`${process.env.PUBLIC_URL}${current.src}`} alt={current.title} />}
      </a>
      <figcaption className={current.group ? "project-caption-grouped" : undefined} aria-live="polite">{current.group && <small className="project-screenshot-group" data-group={current.group}>{current.group}</small>}{(current.headline || !current.category) && <strong className={current.headline ? "project-caption-headline" : undefined}>{current.headline || current.title}</strong>}<p>{current.description}</p></figcaption>
    </figure>
    <div className="project-gallery-controls">
      <button type="button" onClick={() => move(-1)} aria-label="Previous screenshot" title="Previous screenshot"><Icon icon="mdi:arrow-left" /></button>
      <span>{selected + 1} / {screenshots.length}</span>
      <button type="button" onClick={() => move(1)} aria-label="Next screenshot" title="Next screenshot"><Icon icon="mdi:arrow-right" /></button>
    </div>
    <div ref={thumbnails} className="project-gallery-thumbnails" role="group" aria-label="Choose screenshot">
      {screenshots.map((screenshot, index) => <button type="button" key={screenshot.src} title={screenshot.title} aria-label={screenshot.title} aria-pressed={selected === index} onClick={() => { setShowCover(false); setSelected(index); }}>
        <img src={`${process.env.PUBLIC_URL}${screenshot.src}`} alt="" loading="lazy" /><span>{screenshot.category || screenshot.title}</span>
      </button>)}
    </div>
    {imageOpen && <ProjectImageLightbox screenshots={screenshots} selected={selected} color={color} onMove={move} onDismiss={() => setImageOpen(false)} />}
  </div>;
}
