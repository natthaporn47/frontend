import { useEffect, useId, useLayoutEffect, useMemo, useRef, useState } from "react";
import "./TextMorph.css";

function setLayer(element, opacity, blur, scale) {
  element.style.opacity = opacity;
  element.style.filter = blur > 0.01 ? `blur(${blur}px)` : "none";
  element.style.transform = `scale(${scale})`;
}
const smoothstep = value => value * value * (3 - 2 * value);

export default function TextMorph({ words, interval = 2600, morphDuration = 680 }) {
  const values = useMemo(() => words.filter(word => word.trim()), [words]);
  const [index, setIndex] = useState(0);
  const [reduced, setReduced] = useState(false);
  const front = useRef(null);
  const next = useRef(null);
  const stage = useRef(null);
  const filterId = `text-morph-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  const currentIndex = index % (values.length || 1);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(media.matches);
    update();
    media.addEventListener?.("change", update);
    return () => media.removeEventListener?.("change", update);
  }, []);

  useLayoutEffect(() => {
    if (!front.current || !next.current || !stage.current) return;
    setLayer(front.current, 1, 0, 1);
    setLayer(next.current, 0, 12, 0.988);
    stage.current.style.filter = "none";
  }, [currentIndex, values, reduced]);

  useLayoutEffect(() => {
    if (reduced || values.length < 2) return;
    const currentLayer = front.current;
    const nextLayer = next.current;
    const currentStage = stage.current;
    if (!currentLayer || !nextLayer || !currentStage) return;
    let cancelled = false;
    let frame;
    const isActive = () => !cancelled && currentLayer.isConnected && nextLayer.isConnected && currentStage.isConnected;
    const timer = window.setTimeout(() => {
      if (!isActive()) return;
      const started = performance.now();
      currentStage.style.filter = `url(#${filterId})`;
      const renderFrame = now => {
        if (!isActive()) return;
        const progress = Math.min(1, (now - started) / Math.max(240, morphDuration));
        const incoming = smoothstep(Math.min(1, progress / 0.82));
        const outgoing = smoothstep(Math.max(0, (progress - 0.18) / 0.82));
        setLayer(currentLayer, (1 - outgoing) ** 0.55, 12 * outgoing, 1 - outgoing * 0.012);
        setLayer(nextLayer, incoming ** 0.55, 12 * (1 - incoming), 0.988 + incoming * 0.012);
        if (progress < 1) frame = window.requestAnimationFrame(renderFrame);
        else setIndex((currentIndex + 1) % values.length);
      };
      frame = window.requestAnimationFrame(renderFrame);
    }, Math.max(400, interval));
    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (frame !== undefined) window.cancelAnimationFrame(frame);
    };
  }, [currentIndex, values, interval, morphDuration, filterId, reduced]);

  if (!values.length) return null;
  return <span className="text-morph" aria-label={values.join(", ")} aria-live="off">
    <svg className="text-morph-filter" aria-hidden="true" focusable="false"><defs>
      <filter id={filterId} x="-50%" y="-50%" width="200%" height="200%" colorInterpolationFilters="sRGB">
        <feColorMatrix in="SourceGraphic" type="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -8.28" result="thresholded" />
        <feComposite in="SourceGraphic" in2="thresholded" operator="atop" />
      </filter>
    </defs></svg>
    <span className="morph-stage" ref={stage} aria-hidden="true">
      {values.map((word, i) => <span className="morph-sizer" key={i}>{word}</span>)}
      <span className="morph-layer morph-current" ref={front}>{values[currentIndex]}</span>
      <span className="morph-layer morph-next" ref={next}>{values[(currentIndex + 1) % values.length]}</span>
    </span>
  </span>;
}
