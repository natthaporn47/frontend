import { useRef } from "react";
import { motion, stagger, useAnimate, useReducedMotion } from "framer-motion";
import "./LetterCascade.css";

const segmenter = new Intl.Segmenter("th", { granularity: "grapheme" });
const frontRest = { rotateX: 0, opacity: 1, y: 0, filter: "blur(0px)" };
const echoRest = { rotateX: -90, opacity: 0, y: 6, scale: 0.8, filter: "blur(4px)" };

export default function LetterCascade({ text }) {
  const [scope, animate] = useAnimate();
  const reducedMotion = useReducedMotion();
  const playing = useRef(false);

  const trigger = async () => {
    if (reducedMotion || window.matchMedia("(prefers-reduced-motion: reduce)").matches || playing.current) return;
    playing.current = true;
    const spring = { type: "spring", stiffness: 220, damping: 16, delay: stagger(0.04) };
    try {
      await Promise.all([
        animate(".cascade-front", { rotateX: 90, opacity: 0, y: -6, filter: "blur(4px)" }, spring),
        animate(".cascade-echo", { rotateX: 0, opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }, spring),
      ]);
      await Promise.all([
        animate(".cascade-front", frontRest, { duration: 0 }),
        animate(".cascade-echo", echoRest, { duration: 0 }),
      ]);
    } finally {
      playing.current = false;
    }
  };

  return <span ref={scope} className="letter-cascade" aria-label={text}
    onPointerEnter={event => { if (event.pointerType !== "touch") trigger(); }}
    onClick={trigger}>
    {text.split(" ").map((word, wordIndex) => <span key={wordIndex} aria-hidden="true">
      {wordIndex > 0 && " "}
      <span className="cascade-word">{Array.from(segmenter.segment(word), ({ segment }, index) => <span className="cascade-letter" key={index}>
        <motion.span className="cascade-front" style={{ ...frontRest, transformOrigin: "bottom center" }}>{segment}</motion.span>
        <motion.span className="cascade-echo" style={{ ...echoRest, transformOrigin: "top center" }}>{segment}</motion.span>
      </span>)}</span>
    </span>)}
  </span>;
}
