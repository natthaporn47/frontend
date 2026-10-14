import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import "./TextRepel.css";

export function getRepelOffset(dx, dy, radius, strength) {
  const distance = Math.hypot(dx, dy);
  if (distance >= radius) return { x: 0, y: 0 };
  if (distance === 0) return { x: 0, y: -strength };
  const force = (1 - distance / radius) ** 2 * strength;
  return { x: dx / distance * force, y: dy / distance * force };
}

function RepelLetter({ letter, pointer, radius, strength }) {
  const anchor = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 180, damping: 14, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 180, damping: 14, mass: 0.4 });
  const rotate = useTransform(springX, value => value * 0.3);

  useEffect(() => pointer.on("change", position => {
    if (!anchor.current) return;
    const bounds = anchor.current.getBoundingClientRect();
    const offset = position ? getRepelOffset(bounds.left + bounds.width / 2 - position.x, bounds.top + bounds.height / 2 - position.y, radius, strength) : { x: 0, y: 0 };
    x.set(offset.x);
    y.set(offset.y);
  }), [pointer, radius, strength, x, y]);

  return <span className="repel-anchor" ref={anchor}><motion.span className="repel-letter" style={{ x: springX, y: springY, rotate }}>{letter}</motion.span></span>;
}

export default function TextRepel({ text, radius = 120, strength = 45 }) {
  const pointer = useMotionValue(null);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const reset = () => pointer.set(null);
    media.addEventListener?.("change", reset);
    return () => media.removeEventListener?.("change", reset);
  }, [pointer]);

  const move = event => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    pointer.set({ x: event.clientX, y: event.clientY });
  };
  const reset = () => pointer.set(null);

  return <span className="text-repel" aria-label={text} onPointerMove={move} onPointerDown={move}
    onPointerLeave={reset} onPointerUp={event => { if (event.pointerType === "touch") reset(); }} onPointerCancel={reset}>
    {text.split(" ").map((word, wordIndex) => <span key={wordIndex} aria-hidden="true">
      {wordIndex > 0 && " "}
      <span className="repel-word">{Array.from(word, (letter, index) => <RepelLetter key={index} letter={letter} pointer={pointer} radius={radius} strength={strength} />)}</span>
    </span>)}
  </span>;
}
