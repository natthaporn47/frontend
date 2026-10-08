export default function Portrait({ outfit = "white", illustration = false, className = "", caption = "Nice to meet you!", priority = false }) {
  const filename = illustration ? "earn-thoughtful-soft.png" : `earn-${outfit}-cutout.png`;
  return <figure className={`portrait-polaroid ${className}`}>
    <img src={`${process.env.PUBLIC_URL}/images/${filename}`} alt={illustration ? "Illustration of Earn resting her cheek on her hand, wearing a white dress" : `Nattaporn Wangsuk wearing ${outfit === "white" ? "a white dress" : "a blue shirt"}`} width="1024" height={illustration ? "1536" : "1024"} loading={priority ? "eager" : "lazy"} />
    <figcaption>{caption}</figcaption>
  </figure>;
}
