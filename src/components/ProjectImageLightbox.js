import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Icon } from "@iconify/react";
import "./ProjectImageLightbox.css";

export default function ProjectImageLightbox({ screenshots, selected, color, onMove, onDismiss }) {
  const dialog = useRef(null);
  const current = screenshots[selected];
  useEffect(() => {
    const modal = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (modal.open) modal.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return createPortal(<dialog ref={dialog} className={`project-image-lightbox ${color}`} aria-labelledby="project-image-title" onClose={event => event.stopPropagation()} onCancel={event => {
    event.preventDefault();
    event.stopPropagation();
    onDismiss();
  }} onKeyDown={event => {
    if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
      event.preventDefault();
      event.stopPropagation();
      onMove(event.key === "ArrowLeft" ? -1 : 1);
    }
  }} onClick={event => {
    event.stopPropagation();
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onDismiss();
  }}>
    <button className="image-lightbox-close" type="button" aria-label="Close image viewer" title="Close image viewer" onClick={onDismiss}><Icon icon="mdi:close" aria-hidden="true" /></button>
    <div className="image-lightbox-stage">
      <img src={`${process.env.PUBLIC_URL}${current.src}`} alt={current.headline || current.title} />
      <button className="image-lightbox-previous" type="button" aria-label="Previous image" title="Previous image" onClick={() => onMove(-1)} disabled={screenshots.length < 2}><Icon icon="pepicons-print:triangle-left" aria-hidden="true" /></button>
      <button className="image-lightbox-next" type="button" aria-label="Next image" title="Next image" onClick={() => onMove(1)} disabled={screenshots.length < 2}><Icon icon="pepicons-print:triangle-right" aria-hidden="true" /></button>
    </div>
    <footer className="image-lightbox-caption" aria-live="polite"><h2 id="project-image-title">{current.headline || current.category || current.title}</h2><span>{selected + 1} / {screenshots.length}</span></footer>
  </dialog>, document.body);
}
