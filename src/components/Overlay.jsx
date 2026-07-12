const chapters = [
  {
    align: "",
    eyebrow: "Transmission // 001",
    title: <>You are receiving <em>a signal</em></>,
    body: "Somewhere past the edge of the map, something is still broadcasting. Scroll to follow it inward.",
  },
  {
    align: "right",
    eyebrow: "Transmission // 002",
    title: <>Every gate is <em>a question</em></>,
    body: "The rings mark thresholds the message has already crossed. Each one bends the light a little more.",
  },
  {
    align: "",
    eyebrow: "Transmission // 003",
    title: <>Noise becomes <em>form</em></>,
    body: "What looked like static resolves into structure. The deeper you travel, the more intentional it feels.",
  },
  {
    align: "right",
    eyebrow: "Transmission // 004",
    title: <>The source is <em>close</em></>,
    body: "The field tightens. The particles begin to move with purpose rather than drift.",
  },
  {
    align: "center",
    eyebrow: "Transmission // 005",
    title: <>Arrival</>,
    body: "You've reached the core. This is where your real content begins — swap these chapters for yours.",
  },
];

export default function Overlay() {
  return (
    <>
      {chapters.map((c, i) => (
        <section key={i} className={`chapter ${c.align}`}>
          <div className="eyebrow">{c.eyebrow}</div>
          <h2 className="title">{c.title}</h2>
          <p className="body-copy">{c.body}</p>
        </section>
      ))}
    </>
  );
}
