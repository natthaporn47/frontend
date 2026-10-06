import { useEffect, useState } from "react";
import { Icon } from "@iconify/react";

const phrases = ["Frontend Development", "Web Development", "UX/UI Design", "IoT & Embedded Systems"];

export default function TypingLine() {
  const [paused, setPaused] = useState(false);
  const [frame, setFrame] = useState({ phrase: 0, length: 0, deleting: false });
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  useEffect(() => {
    if (paused || reducedMotion) return;
    const full = frame.length === phrases[frame.phrase].length;
    const timer = setTimeout(() => setFrame((current) => {
      if (!current.deleting && full) return { ...current, deleting: true };
      if (current.deleting && current.length === 0) return { phrase: (current.phrase + 1) % phrases.length, length: 0, deleting: false };
      return { ...current, length: current.length + (current.deleting ? -1 : 1) };
    }), full && !frame.deleting ? 2200 : frame.deleting ? 35 : 75);
    return () => clearTimeout(timer);
  }, [frame, paused, reducedMotion]);

  return <div className="typing-line">
    <span className="typing-accessible">Interested in frontend development, web development, UX/UI design, and IoT.</span>
    <span aria-hidden="true">{reducedMotion ? phrases[0] : phrases[frame.phrase].slice(0, frame.length)}<span className={`typing-caret${paused ? " paused" : ""}`}>|</span></span>
    {!reducedMotion && <button type="button" title={paused ? "Resume animation" : "Pause animation"} aria-label={paused ? "Resume animation" : "Pause animation"} onClick={() => setPaused(!paused)}><Icon icon={paused ? "mdi:play" : "mdi:pause"} aria-hidden="true" /></button>}
  </div>;
}
