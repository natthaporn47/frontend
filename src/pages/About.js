import "./About.css";
import { Icon } from "@iconify/react";
import BouncyText from "../components/BouncyText";
import TextRepel from "../components/TextRepel";
import LetterCascade from "../components/LetterCascade";


export default function About() {
  return <main className="about-page about-reference detail-paper"><div className="about-inner">
    <section className="about-layout">
      <div className="about-portrait-column">
        <h1 data-reveal-delay="0"><BouncyText text="About Me" /><Icon className="animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" /></h1>
        <figure className="about-portrait home-reveal" data-reveal-delay="120" aria-label="Portrait of Earn"><div className="about-photo-space"><img src={`${process.env.PUBLIC_URL}/images/earn-about-white-clean-v2.png`} alt="ภาพเอิร์นในชุดสีขาว" width="1008" height="1561" /></div><figcaption>Nice to meet you! <Icon icon="openmoji:paw-prints" aria-hidden="true" /></figcaption></figure>
      </div>
      <div className="about-copy">
        <h2 data-reveal-delay="240"><TextRepel text="Natthaporn Wangsuk" /></h2>
        <p className="about-thai-name" data-reveal-delay="340"><LetterCascade text="ณัฐฐาภรณ์ หวังสุข (เอิร์น)" /></p>
        <p data-reveal-delay="440">นักศึกษาวิศวกรรมศาสตรบัณฑิต</p>
        <dl className="about-facts">
          <div data-reveal-delay="540"><Icon icon="heroicons:cake" aria-hidden="true" /><dt>เกิดวันที่</dt><dd>25 ก.ค. 2547</dd></div>
          <div data-reveal-delay="640"><Icon icon="bi:person" aria-hidden="true" /><dt>อายุ</dt><dd>22 ปี</dd></div>
          <div data-reveal-delay="740"><Icon icon="stash:graduation-cap" aria-hidden="true" /><dt>GPA</dt><dd>2.80</dd></div>
          <div data-reveal-delay="840"><Icon icon="reicon:calendar-days" aria-hidden="true" /><dt>ช่วงฝึกสหกิจ</dt><dd>23 พ.ย. 2569 - 31 มี.ค. 2570</dd></div>
          <div data-reveal-delay="940"><Icon icon="boxicons:location-alt-2" aria-hidden="true" /><dt>Location</dt><dd>Bangkok, Thailand</dd></div>
        </dl>
        <div className="about-paperplane" data-reveal-delay="1040" aria-hidden="true"><Icon icon="fa-regular:paper-plane" /><Icon icon="fa-regular:paper-plane" /></div>
      </div>
    </section>
    <section className="about-education home-reveal" data-reveal-delay="0" aria-labelledby="about-education-title">
      <Icon icon="stash:graduation-cap" aria-hidden="true" />
      <div>
        <h2 id="about-education-title">Education</h2>
        <ol className="about-education-history">
          <li>
            <span className="about-education-marker" aria-hidden="true" />
            <strong><span className="about-education-year">2566 - ปัจจุบัน</span></strong>
            <h3>ปริญญาตรี สาขาเทคโนโลยีวิศวกรรมอิเล็กทรอนิกส์ แขนงคอมพิวเตอร์</h3>
            <p>มหาวิทยาลัยเทคโนโลยีพระจอมเกล้าพระนครเหนือ</p>
          </li>
          <li>
            <span className="about-education-marker" aria-hidden="true" />
            <strong><span className="about-education-year">2560 - 2565</span></strong>
            <h3>มัธยมศึกษาตอนต้น - มัธยมศึกษาตอนปลาย</h3>
            <p>แผนการเรียนวิทย์–คณิต</p>
            <p><em>โรงเรียนวัดธรรมจริยาภิรมย์</em></p>
          </li>
        </ol>
      </div>
    </section>
    </div></main>;
}
