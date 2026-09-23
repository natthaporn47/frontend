import "./Skills.css";

function Skills() {

  return (

    <div className="skills-page">

      {/* Header */}
      <section className="skills-header">

        <div className="section-number">
          04.
        </div>

        <h1>
          <span>Skills</span> & Tools
        </h1>

        <h2>
          เทคโนโลยีและเครื่องมือที่ฉันใช้ในการเรียนรู้และสร้างสรรค์ผลงาน
        </h2>

        <p>
          Technology fuels my ideas, and I keep learning to build a better tomorrow.
        </p>

      </section>


      {/* Main Skills */}
      <section className="skills-scene">


        {/* LEFT TOP */}
        <div className="info-card design-info">

          <div className="info-title">
            <span className="info-icon pink">
              ✦
            </span>

            <h3>
              Design
            </h3>
          </div>

          <ul>
            <li>Figma</li>
            <li>UI/UX Design</li>
            <li>Wireframing</li>
            <li>Prototyping</li>
            <li>Design Thinking</li>
          </ul>

        </div>


        {/* CENTER 3D CARD 1 */}
        <div className="skill-tile design-tile">

          <div className="tile-icon">
            ✎
          </div>

          <div className="tile-title">
            Design
          </div>

        </div>


        {/* CENTER 3D CARD 2 */}
        <div className="skill-tile frontend-tile">

          <div className="tile-icon">
            &lt;/&gt;
          </div>

          <div className="tile-title">
            Frontend
          </div>

        </div>


        {/* RIGHT TOP */}
        <div className="info-card frontend-info">

          <div className="info-title">

            <span className="info-icon blue">
              &lt;/&gt;
            </span>

            <h3>
              Frontend
            </h3>

          </div>

          <ul>
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
            <li>React</li>
            <li>Responsive Design</li>
          </ul>

        </div>


        {/* CENTER BOTTOM */}
        <div className="skill-tile programming-tile">

          <div className="tile-icon">
            &gt;_
          </div>

          <div className="tile-title">
            Programming
          </div>

        </div>


        <div className="skill-tile hardware-tile">

          <div className="tile-icon">
            ⚙
          </div>

          <div className="tile-title">
            Hardware & IoT
          </div>

        </div>


        {/* LEFT BOTTOM */}
        <div className="info-card programming-info">

          <div className="info-title">

            <span className="info-icon green">
              &gt;_
            </span>

            <h3>
              Programming
            </h3>

          </div>

          <ul>
            <li>Python</li>
            <li>C / C++</li>
            <li>PHP</li>
            <li>Dart</li>
            <li>Git & GitHub</li>
          </ul>

        </div>


        {/* RIGHT BOTTOM */}
        <div className="info-card hardware-info">

          <div className="info-title">

            <span className="info-icon yellow">
              ⚙
            </span>

            <h3>
              Hardware & IoT
            </h3>

          </div>

          <ul>
            <li>Arduino</li>
            <li>ESP32</li>
            <li>Raspberry Pi</li>
            <li>Sensors & Modules</li>
            <li>MQTT</li>
          </ul>

        </div>


        {/* Decorative text */}
        <div className="build-text">

          Build<br />
          Learn<br />
          Create<br />
          Repeat ♡

        </div>


      </section>


      {/* Bottom quote */}

      <section className="learning-box">

        <div className="learning-icon">
          💡
        </div>

        <div>

          <p>
            “The more I learn, the more I realize how much more there is to learn.”
          </p>

          <span>
            Keep Learning. Keep Growing. ♡
          </span>

        </div>

      </section>


      <div className="skills-note">

        Small Skills<br />

        <strong>
          Big Opportunities!
        </strong>

      </div>


    </div>

  );
}

export default Skills;