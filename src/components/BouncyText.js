import "./BouncyText.css";

const segments = new Intl.Segmenter("th", { granularity: "grapheme" });
const colors = ["#cf7392", "#568fc1", "#b3983e", "#57967d", "#9273bd", "#c88b57"];

export default function BouncyText({ text, colorful = true }) {
  let index = 0;
  return <span className={`bouncy-text${colorful ? " bouncy-text-colorful" : ""}`} aria-label={text}>
    {text.split(" ").map((word, wordIndex) => <span key={wordIndex}>
      {wordIndex > 0 && " "}
      <span className="bouncy-word" aria-hidden="true">{Array.from(segments.segment(word), item => {
        const letterIndex = index++;
        return <span className="bouncy-letter" key={letterIndex} style={{ "--bounce-delay": `${letterIndex * 35}ms`, "--letter-color": colors[letterIndex % colors.length] }}>{item.segment}</span>;
      })}</span>
    </span>)}
  </span>;
}
