import "./Contact.css";

function Contact() {

  return (

    <div className="contact-page">


      {/* =========================
          LEFT CONTENT
      ========================= */}

      <section className="contact-content">

        <div className="contact-mark">
          N.
        </div>


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
              ✉
            </div>

            <div>
              <span>Email</span>
              <p>your-email@example.com</p>
            </div>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              ☎
            </div>

            <div>
              <span>Phone</span>
              <p>+66 XX XXX XXXX</p>
            </div>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              ●
            </div>

            <div>
              <span>Location</span>
              <p>Bangkok, Thailand</p>
            </div>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              in
            </div>

            <div>
              <span>LinkedIn</span>
              <p>linkedin.com/in/yourname</p>
            </div>

          </div>


          <div className="contact-item">

            <div className="contact-icon">
              &lt;/&gt;
            </div>

            <div>
              <span>GitHub</span>
              <p>github.com/yourname</p>
            </div>

          </div>


        </div>

      </section>



      {/* =========================
          RIGHT CREATIVE AREA
      ========================= */}

      <section className="contact-visual">


        {/* Paper */}

        <div className="paper-note">

          <div className="paper-logo">
            N.
          </div>

          <div className="paper-title">
            PORTFOLIO
          </div>

          <div className="paper-text">
            Hello!
          </div>

        </div>



        {/* Monitor */}

        <div className="monitor">


          <div className="monitor-top">

            <span>
              ●
            </span>

            <span>
              ●
            </span>

            <span>
              ●
            </span>

          </div>


          <div className="screen">


            <div className="code-line">
              send_message()
            </div>


            <div className="code-line-divider">
            </div>


            <div className="message-text">

              "Let's create
              <br />

              something meaningful
              <br />

              together."

            </div>


            <div className="cursor">
              _
            </div>


          </div>

        </div>



        {/* Plant */}

        <div className="plant">

          <div className="stem">
          </div>

          <div className="leaf leaf1">
          </div>

          <div className="leaf leaf2">
          </div>

          <div className="leaf leaf3">
          </div>

          <div className="leaf leaf4">
          </div>

        </div>



        {/* Cable / Light */}

        <div className="light-cable">
        </div>



        {/* Handwritten text */}

        <div className="thank-you">

          Thank you<br />
          for visiting! ♡

        </div>


        <div className="creative-note">

          Good Ideas<br />
          Take Time.

        </div>


      </section>


    </div>

  );
}

export default Contact;