import { Icon } from "@iconify/react";
import "./Contact.css";

function Contact() {

  return (
    <div className="contact-page">
      {/* =========================
          LEFT CONTENT
      ========================= */}

      <section className="contact-content">
        <div className="contact-mark">N.</div>

        <h1>
          Let's
          <br />
          <span>Connect</span>
        </h1>

        <p className="contact-intro">
          ยินดีที่ได้พูดคุยและร่วมงานในโอกาสต่อไปนะคะ
        </p>

        {/* CONTACT INFORMATION */}

        <div className="contact-list">
          <div className="contact-item">
            <div className="contact-icon">
              <Icon
                icon="clarity:email-outline-badged"
                className="contact-icon-svg"
                aria-hidden="true"
              />
            </div>

            <div>
              <span>Gmail</span>
              <p>naththaphrnh@gmail.com</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <Icon
                icon="keyline-icons:phone-call"
                className="contact-icon-svg"
                aria-hidden="true"
              />
            </div>

            <div>
              <span>Phone</span>
              <p>062 470 2688</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <Icon
                icon="boxicons:location-alt-2"
                className="contact-icon-svg"
                aria-hidden="true"
              />
            </div>

            <div>
              <span>Location</span>
              <p>Bangkok, Thailand</p>
            </div>
          </div>

          <div className="contact-item">
            <div className="contact-icon">
              <Icon
                icon="cib:github"
                className="contact-icon-svg"
                aria-hidden="true"
              />
            </div>

            <div>
              <span>GitHub</span>
              <a href="https://github.com/natthaporn47"
                target="_blank"
                rel="noreferrer">
                github.com/natthaporn47
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* =========================
          RIGHT CREATIVE AREA
      ========================= */}

      <section className="contact-visual" aria-label="Portfolio stationery">
        <div className="paper-note">
          <div className="paper-logo">N.</div>
          <div className="paper-title">PORTFOLIO</div>
          <div className="paper-photo" aria-hidden="true">
            <img
              src="https://plus.unsplash.com/premium_photo-1729070677283-c16a03fe5287?q=80&w=928&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt=""
              className="paper-photo-image"
            />
          </div>
          <div className="paper-text">
            Good People
            <br />
            Create Great
            <br />
            Things <span>♡</span>
          </div>
        </div>

        <div className="thank-you">
          Thank you
          <br />
          for visiting! ♡
        </div>
      </section>
    </div>
  );
}

export default Contact;