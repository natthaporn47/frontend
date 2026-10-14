import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Icon } from "@iconify/react";

const revealSelector = [
  ".hero-text", ".hero-scene", ".home-reveal:not(.project-reading-layout)",
  ".scrapbook-filters", ".home-skills-carousel", ".home-project-card", ".home-footer", ".site-footer",
  ".projects-heading", ".project-toolbar", ".project-card", ".projects-github",
  ".project-back", ".project-page-tabs", ".project-tab-panel", ".project-page-footer",
  ".project-showcase-copy > *", ".project-showcase-heading > .project-showcase-art", ".project-header-gallery",
  ".about-portrait-column h1", ".about-copy > h2", ".about-copy > p", ".about-facts > div", ".about-paperplane", ".about-education",
  ".skills-hero", ".paper-filters", ".skill-groups", ".skills-approach",
  ".contact-heading", ".contact-left-column", ".contact-columns > .contact-form"
].join(", ");

export default function PageEffects({ children }) {
  const { pathname } = useLocation();
  const container = useRef(null);
  const progress = useRef(null);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const root = container.current;
    let observer;
    let mutations;
    const configureReveal = () => {
      observer?.disconnect();
      mutations?.disconnect();
      root.querySelectorAll(".scroll-reveal").forEach(element => element.classList.remove("scroll-reveal", "is-revealed"));
      if (reduced.matches || !("IntersectionObserver" in window)) return;
      const registered = new WeakSet();
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.05, rootMargin: "0px 0px -24px 0px" });
      const registerContent = () => {
        root.querySelectorAll(revealSelector).forEach((element, index) => {
          if (registered.has(element) || element.closest("dialog") || element.parentElement.closest(".scroll-reveal")) return;
          registered.add(element);
          element.classList.add("scroll-reveal");
          const springPage = element.closest(".skills-reference, .projects-reference, .contact-reference");
          const delay = element.dataset.revealDelay ?? (springPage ? Math.min(index, 4) * 120 : Math.min(index % 3, 2) * 60);
          element.style.setProperty("--reveal-delay", `${delay}ms`);
          observer.observe(element);
        });
      };
      registerContent();
      mutations = new MutationObserver(registerContent);
      mutations.observe(root, { childList: true, subtree: true });
    };
    configureReveal();
    reduced.addEventListener?.("change", configureReveal);
    const revealFocusedContent = event => {
      const element = event.target.closest(".scroll-reveal");
      if (element) {
        element.style.setProperty("--reveal-delay", "0ms");
        element.classList.add("is-revealed");
        observer?.unobserve(element);
      }
    };
    root.addEventListener("focusin", revealFocusedContent);
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
      mutations?.disconnect();
      reduced.removeEventListener?.("change", configureReveal);
      root.removeEventListener("focusin", revealFocusedContent);
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
