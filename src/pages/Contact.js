import { Icon } from "@iconify/react";
import "./Contact.css";
import BouncyText from "../components/BouncyText";
import { useEffect, useRef, useState } from "react";

export const contactEmail = "naththaphrnh@gmail.com";
export const contactEndpoint = `https://formsubmit.co/ajax/${contactEmail}`;
export const contactActivationEndpoint = `https://formsubmit.co/${contactEmail}`;

function ContactMessageForm({ titleId = "contact-form-title", onDismiss }) {
  const [messageStatus, setMessageStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [sendFailed, setSendFailed] = useState(false);
  const [activationRequired, setActivationRequired] = useState(false);
  const submissionPending = useRef(false);
  const sendMessage = async event => {
    if (event.nativeEvent.submitter?.value === "request-activation") {
      if (submissionPending.current || new FormData(event.currentTarget).get("_honey")) {
        event.preventDefault();
        return;
      }
      setMessageStatus(`เปิดหน้า FormSubmit ในแท็บใหม่แล้วค่ะ ทำขั้นตอนในหน้านั้น แล้วเปิดอีเมลที่ ${contactEmail} เพื่อกด Activate Form`);
      return;
    }
    event.preventDefault();
    const form = event.currentTarget;
    if (submissionPending.current || !form.reportValidity()) return;
    const fields = new FormData(form);
    if (fields.get("_honey")) return;
    submissionPending.current = true;
    setSending(true);
    setSendFailed(false);
    setMessageStatus("");
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);
    try {
      const response = await fetch(contactEndpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        signal: controller.signal,
        body: JSON.stringify({
          name: fields.get("name").trim(),
          email: fields.get("email").trim(),
          subject: fields.get("subject").trim(),
          message: fields.get("message").trim(),
          _subject: fields.get("subject").trim() || "New portfolio enquiry",
          _template: "table",
          _url: window.location.href,
          _honey: ""
        })
      });
      const result = await response.json();
      const serviceMessage = typeof result.message === "string" ? result.message : "";
      if (/activat|confirm.*email|verify.*email/i.test(serviceMessage)) {
        setActivationRequired(true);
        setSendFailed(true);
        setMessageStatus(`ฟอร์มยังไม่ได้เปิดใช้งานค่ะ กด “ขออีเมลยืนยัน” ด้านล่าง แล้วกด Activate Form ในอีเมลที่ส่งไปยัง ${contactEmail} (ตรวจใน Spam ด้วยค่ะ)`);
        return;
      }
      if (response.status === 429) {
        setSendFailed(true);
        setMessageStatus("ส่งข้อความถี่เกินไป กรุณารอสักครู่แล้วลองใหม่ค่ะ");
        return;
      }
      if (!response.ok || (result.success !== true && result.success !== "true")) throw new Error("Submission rejected");
      setActivationRequired(false);
      setMessageStatus("บริการรับข้อความแล้วค่ะ ขอบคุณที่ติดต่อมา");
      form.reset();
    } catch (error) {
      setSendFailed(true);
      setMessageStatus(error.name === "AbortError" ? "บริการส่งอีเมลไม่ตอบกลับทันเวลา กรุณาลองใหม่ค่ะ" : "ส่งข้อความไม่สำเร็จ กรุณาลองอีกครั้ง หรือใช้อีเมลติดต่อโดยตรงค่ะ");
    } finally {
      clearTimeout(timeout);
      submissionPending.current = false;
      setSending(false);
    }
  };
  return <form className="contact-form" action={contactActivationEndpoint} method="POST" rel="noopener" onSubmit={sendMessage} aria-busy={sending}><div className="contact-form-heading"><div><h2 id={titleId}>Send a Message</h2><p className="contact-panel-caption">ส่งข้อความถึงฉันได้เลย</p></div>{onDismiss ? <button className="contact-dialog-close" type="button" title="Close message" aria-label="Close message" onClick={onDismiss}><Icon icon="mdi:close" aria-hidden="true" /></button> : <span className="contact-plane-decoration" aria-hidden="true"><svg className="contact-plane-trail" viewBox="0 0 86 48" fill="none"><path d="M 3 43 Q 37 43 58 25" stroke="currentColor" strokeWidth="1.5" strokeDasharray="6 7" strokeLinecap="round" /></svg><Icon className="contact-plane-icon" icon="akar-icons:paper-airplane" /></span>}</div>
          <input type="hidden" name="_url" value={window.location.href} />
          <input type="hidden" name="_template" value="table" />
          <input className="contact-honeypot" name="_honey" type="text" tabIndex={-1} autoComplete="off" aria-hidden="true" />
          <label className="contact-field"><span className="contact-field-label">Name</span><Icon icon="mdi:account-outline" aria-hidden="true" /><input name="name" placeholder="Your Name" required autoComplete="name" maxLength="100" /></label>
          <label className="contact-field"><span className="contact-field-label">Email</span><Icon icon="clarity:email-outline-badged" aria-hidden="true" /><input name="email" placeholder="Your Email" type="email" required autoComplete="email" maxLength="254" /></label>
          <label className="contact-field"><span className="contact-field-label">Subject</span><Icon icon="bx:message-square-detail" aria-hidden="true" /><input name="subject" placeholder="Subject" maxLength="140" /></label>
          <label className="contact-field contact-message-field"><span className="contact-field-label">Message</span><Icon icon="boxicons:message-bubble-dots" aria-hidden="true" /><textarea name="message" placeholder="Your Message" required rows="5" maxLength="4000" /></label>
          <button className="paper-button" type="submit" disabled={sending}>{sending ? "Sending..." : "Send Message"} <Icon icon="mdi:arrow-right" aria-hidden="true" /></button><p className="contact-send-status" role={sendFailed ? "alert" : "status"}>{messageStatus}</p>
          {activationRequired && <button className="contact-activation-button" type="submit" name="action" value="request-activation" formTarget="_blank" disabled={sending}>ขออีเมลยืนยัน <Icon icon="mdi:arrow-right" aria-hidden="true" /></button>}
        </form>;
}

export function ContactMessageDialog({ onDismiss }) {
  const dialog = useRef(null);
  useEffect(() => {
    const modal = dialog.current;
    const previousFocus = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    if (!modal.open) modal.showModal();
    document.body.style.overflow = "hidden";
    return () => {
      if (modal.open) modal.close();
      document.body.style.overflow = previousOverflow;
      if (previousFocus?.isConnected) previousFocus.focus({ preventScroll: true });
    };
  }, []);

  return <div className="contact-reference contact-page contact-message-host"><dialog ref={dialog} className="contact-dialog" aria-labelledby="contact-popup-title" onCancel={event => { event.preventDefault(); onDismiss(); }} onClick={event => {
    if (event.target !== event.currentTarget) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    if (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom) onDismiss();
  }}><ContactMessageForm titleId="contact-popup-title" onDismiss={onDismiss} /></dialog></div>;
}

export default function Contact() {
  const [copyStatus, setCopyStatus] = useState("");
  const [messageOpen, setMessageOpen] = useState(false);
  const copyEmail = async () => {
    let copied = false;
    try { await navigator.clipboard.writeText(contactEmail); copied = true; }
    catch { /* Clipboard access may require a secure context. */ }
    if (!copied) {
      const field = document.createElement("textarea");
      field.value = contactEmail;
      field.style.position = "fixed";
      field.style.opacity = "0";
      document.body.append(field);
      field.select();
      try { copied = document.execCommand("copy"); } catch { copied = false; }
      field.remove();
      document.getElementById("copy-contact-email")?.focus({ preventScroll: true });
    }
    setCopyStatus(copied ? "คัดลอกอีเมลแล้วค่ะ" : "คัดลอกไม่ได้ กรุณาเลือกอีเมลเพื่อคัดลอกค่ะ");
  };
  return <main className="contact-page contact-reference detail-paper">
    <div className="contact-inner">
      <header className="contact-heading">
        <div><span className="contact-eyebrow">Let's Talk! <Icon className="animated-sparkle" icon="mdi:creation-outline" aria-hidden="true" /></span><h1><BouncyText text="Let's Connect" /></h1><p className="contact-intro">หากมีโอกาสได้ร่วมงานกัน ยินดีเป็นอย่างยิ่งค่ะ :)</p></div>
      </header>
      <div className="contact-columns">
        <div className="contact-left-column">
          <section className="contact-information contact-notebook" aria-labelledby="contact-information-title"><h2 id="contact-information-title">Contact Information</h2><p className="contact-panel-caption">ช่องทางการติดต่อ</p>
            <div className="contact-list">
              <div className="contact-item"><button className="contact-icon contact-email-trigger" type="button" title="Send a Message" aria-label="Send a message by email" aria-haspopup="dialog" aria-expanded={messageOpen} onClick={() => setMessageOpen(true)}><Icon icon="clarity:email-outline-badged" aria-hidden="true" /></button><div><strong>Email</strong><a href={`mailto:${contactEmail}`}>{contactEmail}</a></div><button id="copy-contact-email" className="copy-contact-email" type="button" title="Copy email" aria-label="Copy email" onClick={copyEmail}><Icon icon="mdi:content-copy" aria-hidden="true" /></button></div>
              <a className="contact-item" href="tel:+66624702688"><span className="contact-icon"><Icon icon="carbon:phone-voice" aria-hidden="true" /></span><span><strong>Phone</strong><span>062 470 2688</span></span></a>
              <a className="contact-item contact-github" href="https://github.com/natthaporn47" target="_blank" rel="noreferrer"><span className="contact-icon"><Icon icon="akar-icons:github-fill" aria-hidden="true" /></span><span><strong>GitHub</strong><span>github.com/natthaporn47</span></span></a>
              <div className="contact-item"><span className="contact-icon"><Icon icon="boxicons:location-alt-2" aria-hidden="true" /></span><div><strong>Location</strong><span className="contact-location">Bangkok, Thailand</span></div></div>
            </div><p className="contact-copy-status" role="status">{copyStatus}</p>
          </section>
          <section className="contact-follow" aria-labelledby="contact-follow-title"><h2 id="contact-follow-title">Follow Me</h2><div className="contact-socials"><a href="https://github.com/natthaporn47" target="_blank" rel="noreferrer" title="GitHub" aria-label="Follow Earn on GitHub"><Icon icon="akar-icons:github-fill" aria-hidden="true" /></a><button type="button" title="Email" aria-label="Email Earn" aria-haspopup="dialog" aria-expanded={messageOpen} onClick={() => setMessageOpen(true)}><Icon icon="clarity:email-outline-badged" aria-hidden="true" /></button></div></section>
        </div>
        <ContactMessageForm />
      </div>
    </div>
    {messageOpen && <ContactMessageDialog onDismiss={() => setMessageOpen(false)} />}
  </main>;
}
