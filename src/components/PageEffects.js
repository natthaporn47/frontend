import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

export default function PageEffects({ children }) {
  const { pathname } = useLocation();
  const container = useRef(null);
  const progress = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    let observer;
    if (!reduced.matches && "IntersectionObserver" in window) {
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08 });
      container.current.querySelectorAll(".hero-text, .hero-scene, .home-reveal, .projects-heading, .project-card, .about-copy, .basic-information, .about-right-column, .skills-hero, .skill-group, .skills-lower, .contact-content, .contact-visual").forEach((element, index) => {
        element.classList.add("scroll-reveal");
        element.style.setProperty("--reveal-delay", `${Math.min(index % 4, 3) * 70}ms`);
        observer.observe(element);
      });
    }
    const updateScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      progress.current.style.transform = `scaleX(${range > 0 ? Math.min(window.scrollY / range, 1) : 0})`;
      setShowTop(window.scrollY > 350);
    };
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    window.addEventListener("resize", updateScroll);
    return () => {
      observer?.disconnect();
      window.removeEventListener("scroll", updateScroll);
      window.removeEventListener("resize", updateScroll);
    };
  }, [pathname]);

  return <>
    <div ref={progress} className="reading-progress" aria-hidden="true" />
    <div ref={container} className="page-content" key={pathname}>{children}</div>
    {showTop && <button className="back-to-top" type="button" title="Back to top" aria-label="Back to top" onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "instant" : "smooth" })}>
      <Icon icon="mdi:arrow-up" aria-hidden="true" />
    </button>}
  </>;
}
