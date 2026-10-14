import { useLocation } from "react-router-dom";
import TextRepel from "./TextRepel";
import "./SiteFooter.css";

export default function SiteFooter() {
  const { pathname } = useLocation();
  if (!["/about", "/skills", "/projects", "/contact"].includes(pathname) && !pathname.startsWith("/projects/")) return null;
  return <footer className="site-footer" data-reveal-delay="120"><TextRepel text="Natthaporn Wangsuk" /></footer>;
}
